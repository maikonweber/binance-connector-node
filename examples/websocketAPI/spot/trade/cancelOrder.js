'use strict'

const { Console } = require('console')
const WebsocketAPI = require('../../../../src/websocketAPI')

const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

const apiKey = process.env.BINANCE_API_KEY || ''
const apiSecret = process.env.BINANCE_API_SECRET || ''
const wsURL = 'wss://ws-api.testnet.binance.vision/ws-api/v3' // we setup wsURL to testnet. The default value set to production site: wss://ws-api.binance.com/ws-api/v3

const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    client.cancelOrder('BNBUSDT', {
      orderId: 3283713,
      newClientOrderId: 'cancel_order_id_3283713'
    })
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketAPIClient = new WebsocketAPI(apiKey, apiSecret, { logger, callbacks, wsURL })

// disconnect after 20 seconds
setTimeout(() => websocketAPIClient.disconnect(), 20000)
