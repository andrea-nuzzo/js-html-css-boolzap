const app = new Vue({
    el:'#root',
    data:{
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di dargli da mangiare',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [{
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [{
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [{
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
                ],
            },
        ],

        // Variabile per conoscere l'utente selezionato
        activeIndex: 0,

        // Input invio messaggi
        inputMessage: '',

        // Input ricerca utenti
        inputSearch: '',
        
    },
    methods:{

        //Questa funzione crea l'immagine dinamicamente
        getImg: function(avatar){
            return `img/avatar${avatar}.jpg`
        },

        // Questa funzione selezione l'untete che clicco attraverso l'index
        setActiveUsers: function(index){
            this.activeIndex = index;
        },

        // Questa funzione invia un nuovo messaggio e una risposta automatica dall'interlocutore 
        sentNewMessage: function(index){
            
            // Creo un nuovo oggetto che conterrà il messaggio
            let newMeassageObj= {
                date:  this.messageDate(),
                message: this.inputMessage,
                status: 'sent'
            }

            //Se il messaggio non è vuoto
            if( this.inputMessage != ''){

                // Pusho il nuovo messaggio
                this.contacts[index].messages.push(newMeassageObj)
                // E svuoto il campo input
                this.inputMessage = '';

                // Inizializzo una funzione che risponderà automaticamente dopo un secondo
                setTimeout(function(){
                    // Creo un oggetto con il messaggio standard
                   const automaticMeassageObj= {
                        date:  app.messageDate(),
                        message: 'Ok',
                        status: 'received'
                    }
                    // Pusho la risposta
                   app.contacts[index].messages.push(automaticMeassageObj)

                }, 1000);
            }
        },

        searchUser: function(){
            console.log(this.inputSearch);
            console
        },

        // Questa funzione crea una data con il formato gg/mm/YYY HH:mm:ss
        messageDate: function(){
            let date = new Date();
            let dateMessage = ('0' + date.getDate()).slice(-2) + '/' + ('0' + (date.getMonth()+1)).slice(-2) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' +  date.getSeconds();
            return dateMessage;
        }
    },

    computed: {
        filteredUsers: function(){
            return this.contacts.filter((contact)=> {
                return contact.name.toLowerCase().match(this.inputSearch)
            });
        }
    },
});