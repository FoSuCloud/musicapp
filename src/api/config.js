const commonParams = {
  g_tk: 5381,
  inCharset: 'utf-8',
  outCharset: 'GB2312',
  notice: 0,
  format: 'jsonp'
}

const options = {
  param: 'jsonpCallback'
}

const ERR_OK = 0

module.exports = {
  commonParams,
  options,
  ERR_OK
}
