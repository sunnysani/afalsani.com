/**
 * Google Sheets API v4 helpers.
 *
 * Auth strategy:
 *   - If apiKey starts with "ya29." → treated as an OAuth2 Bearer token
 *     (use for write-enabled sheets; obtain via Google OAuth playground)
 *   - Otherwise → used as a ?key= query parameter
 *     (read-only on public sheets; write requires sheet shared publicly with edit)
 *
 * For personal use, the recommended approach is to obtain an access token
 * from https://developers.google.com/oauthplayground using the
 * "Google Sheets API v4" scope, then paste it as the API Key.
 * Access tokens expire in ~1 hour; see README for details.
 */

const BASE = 'https://sheets.googleapis.com/v4/spreadsheets'

function buildHeaders(apiKey) {
  if (apiKey.startsWith('ya29.')) {
    return { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' }
  }
  return { 'Content-Type': 'application/json' }
}

function buildKeyParam(apiKey, prefix = '?') {
  if (apiKey.startsWith('ya29.')) return ''
  return `${prefix}key=${encodeURIComponent(apiKey)}`
}

/**
 * Fetch spreadsheet metadata to resolve sheet name from GID.
 */
export async function getSpreadsheetMeta(spreadsheetId, apiKey) {
  const url = `${BASE}/${spreadsheetId}${buildKeyParam(apiKey)}`
  const res = await fetch(url, { headers: buildHeaders(apiKey) })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body?.error?.message || `HTTP ${res.status}: Unable to fetch spreadsheet metadata`)
  }
  return res.json()
}

/**
 * Resolve a human-readable sheet name from its GID (numeric sheet/tab ID).
 */
export async function resolveSheetName(spreadsheetId, gid, apiKey) {
  const meta = await getSpreadsheetMeta(spreadsheetId, apiKey)
  const numericGid = parseInt(gid, 10)
  const sheet = meta.sheets?.find((s) => s.properties?.sheetId === numericGid)
  if (!sheet) throw new Error(`Sheet with GID ${gid} not found in the spreadsheet.`)
  return sheet.properties.title
}

/**
 * Append a single row to the sheet using the values.append endpoint.
 * The API automatically finds the last populated row and appends below it.
 *
 * @param {string} spreadsheetId
 * @param {string} sheetName  - Human-readable sheet/tab name
 * @param {string} apiKey
 * @param {string[]} rowValues - Array of cell values: [date, paymentMethod, desc, category, amount, references]
 */
export async function appendSheetRow(spreadsheetId, sheetName, apiKey, rowValues) {
  // Range covers A:F; the API finds the next empty row automatically
  const range = encodeURIComponent(`${sheetName}!A:F`)
  const keyParam = buildKeyParam(apiKey, '&')
  const url = `${BASE}/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS${keyParam}`

  const res = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(apiKey),
    body: JSON.stringify({ values: [rowValues] }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    const msg = body?.error?.message || `HTTP ${res.status}`
    // Provide helpful guidance for the most common errors
    if (res.status === 403) {
      throw new Error(
        `Permission denied (403). Make sure the sheet is shared with edit access and your API key / Bearer token has write permissions. See README for setup instructions.`,
      )
    }
    if (res.status === 401) {
      throw new Error(
        `Unauthorized (401). Your Bearer token may have expired. Refresh it at https://developers.google.com/oauthplayground`,
      )
    }
    throw new Error(msg)
  }

  return res.json()
}
