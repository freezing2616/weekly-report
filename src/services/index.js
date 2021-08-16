import request from '@/utils/request'

export function sendReport(data) {
  return request({
    url: '/cgi-bin/webhook/send?key=7e30d675-f0d0-45d6-b4f9-c59d7400c0a1',
    method: 'post',
    data,
  })
}
