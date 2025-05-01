FROM rabbitmq:3-management

# Copia um arquivo de configuração customizado
COPY rabbitmq.conf /etc/rabbitmq/

# Copia definições (como exchanges, queues) para serem carregadas automaticamente
COPY definitions.json /etc/rabbitmq/

# Habilita plugins extras, se necessário
RUN rabbitmq-plugins enable --offline rabbitmq_shovel rabbitmq_shovel_management
