const amqp = require("amqplib");

async function sendEmails() {
  const connection = await amqp.connect("amqp://root:root@localhost:5672");
  const channel = await connection.createChannel();

  const queue = "email_queue";
  await channel.assertQueue(queue, { durable: true });

  for (let i = 1; i <= 100000; i++) { // Aqui são enviadas as informações do email
    const email = {
      to: `cliente${i}@exemplo.com`,
      subject: "Sua nota fiscal chegou!",
      body: `Segue sua nota fiscal número ${i}`
    };

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(email)), {
      persistent: true
    });

    console.log(`E-mail #${i} enviado para a fila`);
  }

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

sendEmails();
