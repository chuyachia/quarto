import axios from 'axios';
import messageTemplate from './templates/message.hbs';
import gifpreviewTemplate from './templates/gifpreview.hbs';

var Chat = function(socket,room){
    var sidebarbtn = document.getElementById('sidebar-btn');
    var sidebar = document.getElementById('sidebar');
    var chat = document.getElementById('chat');
    var message = document.getElementById('message-text');
    var search = document.getElementById('gif-search');
    var gifbtn = document.getElementById('gif-btn');
    var gifsearch = document.getElementById('gifsearch');
    var gifpreview = document.getElementById('gifpreview');
    var gifs=[];
    var next = null;
    var searchterm = null;
    
    function showchat(){
        if (!sidebar.classList.contains('nowidth')) {
            sidebar.classList.add('nowidth');
        } else {
            sidebar.classList.remove('nowidth');
            if (sidebarbtn.classList.contains('unread')) {
                sidebarbtn.classList.remove('unread');
            }
        }
    }
    
    function gettrendinggifs(){
        axios.get('/gif/trending',{
            params:{pos:next}
        }).then(function(results){
            gifs=results.data.results.map(function(g){
                return {
                    preview:g.media[0].nanogif.url,
                    share:g.media[0].tinygif.url,
                    width:g.media[0].tinygif.dims[0],
                    height:g.media[0].tinygif.dims[1]
                };
            });
            next=results.data.next;
            gifpreview.innerHTML+=gifpreviewTemplate({gifs:gifs});
        }).catch(function(err){
            console.log(err);
        });
    }   
    function getsearchgifs(){
        axios.get('/gif/search',{
            params:{pos:next,term:searchterm}
        }).then(function(results){
            gifs=results.data.results.map(function(g){
                return {
                    preview:g.media[0].nanogif.url,
                    share:g.media[0].tinygif.url,
                    width:g.media[0].tinygif.dims[0],
                    height:g.media[0].tinygif.dims[1]                    
                };
            });
            next=results.data.next;
            gifpreview.innerHTML+=gifpreviewTemplate({gifs:gifs});
        }).catch(function(err){
            console.log(err);
        });        
    }
    
    function searchgif(ev){
        if (ev.keyCode===13) {
            searchterm = search.value;
            gifpreview.innerHTML='';
            getsearchgifs();
        }        
    }
    
    function showgif(){
        if(gifsearch.classList.contains('noshow')){
            gifsearch.classList.remove('noshow');
            if (gifs.length==0)
                gettrendinggifs();
        } else {
            gifsearch.classList.add('noshow');
        }
    }
    
    function sharegif(ev) {
        if(ev.target.nodeName=="IMG") {
            var url = ev.target.attributes['data-share'].value;
            var width =  ev.target.attributes['data-width'].value;
            var height = ev.target.attributes['data-height'].value;
            chat.innerHTML+=messageTemplate({other:false,url:url,width:width,height:height});
            chat.scrollTop = chat.scrollHeight;
            showgif();
            socket.emit('gif',{room:room,url:url,width:width,height:height});
        }
    }
    
    function contsearch(){
        if (Math.round(gifpreview.offsetHeight)+Math.round(gifpreview.scrollTop)==Math.round(gifpreview.scrollHeight)) {
            if (searchterm) {
                getsearchgifs();
            } else {
                gettrendinggifs(); 
            }
        }
    }
    
    function clearmessage(){
        chat.innerHTML='';
        chat.innerHTML ="<div>-- Beginning of the conversation --</div>";        
    }
    
    function appendmessage(message) {
        chat.innerHTML+= messageTemplate({other:true,message:message});
        chat.scrollTop = chat.scrollHeight;     
        if (sidebar.classList.contains('nowidth')) {
            sidebarbtn.classList.add('unread');
        }        
    }
    function appendgif(url,width,height) {
        chat.innerHTML+= messageTemplate({other:true,url:url,width:width,height:height});
        chat.scrollTop = chat.scrollHeight;     
        if (sidebar.classList.contains('nowidth')) {
            sidebarbtn.classList.add('unread');
        }        
    }
    function sendmessage(ev){
        if (ev.keyCode===13) {
            if (!ev.ctrlKey){
                ev.preventDefault();
                socket.emit('message',{room:room,message:message.value});
                chat.innerHTML+= messageTemplate({other:false,message:message.value});
                message.value ='';
                chat.scrollTop = chat.scrollHeight;
            }
        }
    }
    
    sidebarbtn.addEventListener('click',showchat);
    message.addEventListener('keydown',sendmessage);
    gifbtn.addEventListener('click',showgif);
    gifpreview.addEventListener('scroll',contsearch);
    gifpreview.addEventListener('click',sharegif);
    gifsearch.addEventListener('keydown',searchgif);
    
    return {
        appendmessage:appendmessage,
        appendgif:appendgif,
        clearmessage:clearmessage
    };
};

export default Chat;