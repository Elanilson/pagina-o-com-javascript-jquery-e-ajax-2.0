let dadosJson; // dados da api
let postPorPagina = 5; // quantidade de post  a ser exibido por página
let paginaAtual =1; // difinição padrão da página
//let deslocamento ;

$(document).ready( ()=>{
    loadingGif();
     let url = "https://jsonplaceholder.typicode.com/posts"; // api
     let ajax = new XMLHttpRequest();
     ajax.open("GET",url);
     ajax.onreadystatechange = () =>{
         if(ajax.readyState == 4 && ajax.status == 200){

             let dadosJsonText = ajax.responseText;
              dadosJson = JSON.parse(dadosJsonText)
             let totaldePagina = dadosJson.length / postPorPagina;
            // deslocamento = (paginaAtual * totaldePagina);
           //  let controle = (postPorPagina *paginaAtual);
             console.log("post por pagina "+postPorPagina)
            // console.log("Deslocamento "+deslocamento)
          //   console.log("controle "+controle)
             carregarPostagem(paginaAtual)
             document.getElementById("loading").remove(); // remover loading
             
             // criando enumeração de páginas
             for (let x = totaldePagina; x >=1 ;x--){
                 $("#paginaItem").after(`<li id="li${x}" class="page-item  "><a href="" class="page-link " id="pagina${x}">${x}</a></li>`);
                
                 //Atribuindo o evento de click
                 $(`#pagina${x}`).on('click',(e) =>{
                    e.preventDefault( );
                    $("#column-conteudo").html("");
                    // loadingGif();
                    //carregando as postagem e passando por paremtro o numero da pagina selecionada
                    carregarPostagem(`${x}`);
                    //removendo  a class do item selecionado anteriomente
                    $(`#li${paginaAtual}`).removeClass("page-item active");
                    
                    // adicionando class ao item selecionado
                    $(`#li${x}`).addClass("page-item active");
                    // salvando na variavel o valor da pagina inicial para ser desmarcada posteriomente
                    paginaAtual = x;

                })
                // marcando a primeira pagina ao criar a paginação
                $(`#li${paginaAtual}`).addClass("page-item active");

             }
           

         }
         /*
         mensagem para quando  o aconceção do sevidor der sucesso, não tiver nenhum retorno
         */
         if(ajax.readyState == 4 && ajax.status == 404){
            document.getElementById('column-conteudo').innerHTML = "Tente novamente mais tarde!"

         }
     }


    
     ajax.send()

 });
                /*
                    numpagina recebe o valor padrão 1 caso não seja passado parametros
                    numpagina recebe ele mesmo * a quantidade de post por página que é 10
                */
         function carregarPostagem (numpagina = 1){
             numpagina = numpagina * postPorPagina;
            for(let x in dadosJson){
                if(numpagina == postPorPagina){ // verifica se o número da página e itual ao número  de post por página
                    if(x <= numpagina){ // se for menor ele vai mostrar de 0 a 10
                        if(x <= (postPorPagina-1)){ // menos um pq é 0 a 10 que da 11 e só tem que exibir 10 por página
                            console.log("entrou 1 "+(postPorPagina-1))
                            $('#column-conteudo').append(`<div class="card bg-danger text-white mb-2">       <div class="card-header">         Postagem Nº ${dadosJson[x].id}       </div>       <div class="card-body">         <h4 class="card-title">${dadosJson[x].title}</h4>         <h6 class="card-subtitle">Subtítulo do cartão</h6>         <p class="card-text">${dadosJson[x].body}</p>         <a class="btn btn-outline-light" href="">Leia mais</a>       </div>     </div>`)
    
                        }
    
                    }
                }else if (x >= numpagina-postPorPagina && x <numpagina){ // x>= Nº da pagina - 10  &&  x < n° página
                    console.log("entrou 2")
                    $('#column-conteudo').append(`<div class="card bg-danger text-white mb-2">       <div class="card-header">         Postagem Nº ${dadosJson[x].id}       </div>       <div class="card-body">         <h4 class="card-title">${dadosJson[x].title}</h4>         <h6 class="card-subtitle">Subtítulo do cartão</h6>         <p class="card-text">${dadosJson[x].body}</p>         <a class="btn btn-outline-light" href="">Leia mais</a>       </div>     </div>`)

                }
                
                }

         }


 function loadingGif(){
    //incluir o gif de loading na pagina
    if(!document.getElementById('loading')){
    let imgLoad = document.createElement('img')
    imgLoad.id = 'loading'
    imgLoad.src = 'img/loading.gif'
    imgLoad.className = 'rounded mx-auto d-block'
    document.getElementById('column-conteudo').appendChild(imgLoad);
    }else{
        document.getElementById("loading").remove();
    }
}
