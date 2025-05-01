const amqp = require("amqplib");

async function consumeEmails() {
  const connection = await amqp.connect("amqp://root:root@rabbitmq:5672");
  const channel = await connection.createChannel();

  const queue = "email_queue";
  await channel.assertQueue(queue, { durable: true });

  channel.prefetch(5); // Limita para 5 mensagens ao mesmo tempo

  channel.consume(queue, (msg) => {
    if (msg !== null) {
      const email = JSON.parse(msg.content.toString()); //Aqui pode ser trabalhado para enviar um email da forma correta, estou enviando um json somente para simular
      console.log(`📨 Enviando e-mail para: ${email.to}`);

      console.log(`✅ E-mail enviado para: ${email.to}`);
      channel.ack(msg);
    }
  });

  console.log("Aguardando mensagens na fila...");
}

consumeEmails();
