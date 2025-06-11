# Conectividade na Paraíba

Aplicação web desenvolvida para mapear a conectividade no estado da Paraíba, com o objetivo de identificar áreas com acesso limitado ou inexistente à internet e, a partir disso, fornecer subsídios para a formulação de políticas públicas que promovam a inclusão digital. A aplicação conta com um mapa interativo, que exibe os dados de conectividade reunidos em todo o território paraibano, permitindo uma visualização clara e dinâmica das regiões com maior necessidade de atenção. O projeto foi realizado em parceria com demandantes reais e possui grande relevância social, contribuindo para a redução das desigualdades regionais no acesso à informação e à tecnologia.

## Tecnologias utilizadas

- React.js — biblioteca JavaScript para construção da interface da aplicação.
- Leaflet.js — biblioteca de código aberto para renderização de mapas interativos na web.

## Funcionalidades técnicas

- Mapa interativo com dados geoespaciais: utiliza o react-leaflet e o Leaflet.js para exibir os municípios da Paraíba com cores diferenciadas de acordo com a porcentagem de cobertura de internet.

- Integração com arquivos CSV e GeoJSON: os dados dos municípios foram processados a partir de um arquivo .csv e integrados com um .geojson, permitindo a junção de dados estatísticos com informações geográficas.

- Estilização dinâmica por faixa de cobertura: cada município é colorido com base em sua porcentagem de cobertura, facilitando a visualização de regiões mais ou menos conectadas.

- Pop-ups informativos por município: ao clicar em um município, é exibido um pop-up com o nome e a porcentagem de moradores cobertos por internet.

- Legenda dinâmica no mapa: uma legenda foi adicionada ao mapa para indicar o significado das cores utilizadas.



## Capturas de tela

Capturas de tela para melhor visualização da aplicação em funcionamento.

![prints-readme-conectividade](https://github.com/user-attachments/assets/b83ab2e8-2d6b-4bc8-a4e1-2b99865d828b)

![prints-readme-conectividade-2](https://github.com/user-attachments/assets/bbccc1c7-3040-4f71-858b-324df146ff80)
