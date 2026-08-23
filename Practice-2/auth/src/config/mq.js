import amqplib from 'amqplib'

const QUEUE = 'notification_queue'

const connection = await amqplib.connect(process.env.RABBITMQ_URL)

const channel = await connection.createChannel()

await channel.assertQueue(QUEUE, { durable: true })

export async function sendNotification (message) {
  await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(message)), {
    persistent: true
  })
}
