import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_paser', (req, res) => {
      res.send(req.body)
    })

    await request(app)
      .post('/test_body_paser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
