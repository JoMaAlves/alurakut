import { SiteClient } from 'datocms-client';

export default async function RequestReceiver(request, response) {

  if( request.method === "POST") {
    const TOKEN = 'dfddaf68711f5e355a719f329d62fc';
  
    const client = new SiteClient(TOKEN)
  
    const registroCriado = await client.items.create({
      itemType: "967985",
      ...request.body
    })
  
    console.log(registroCriado)
    
    response.json({
      data: "hello",
      registroCriado: registroCriado
    })

    return;
  }

  response.status(404).json({
    message: 'Ainda nao temos nada no GET, mas no POST tem!'
  })
}