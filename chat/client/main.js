alert('inserted any way!');

const DOMHandler = (() => {
  const chatDOM = {};
  const createChatDOM = () => {
    const container = $('<div/>');
    container.css({
      'bottom': '10px',
      'position': 'sticky',
      'padding-bottom': '30px',
      'padding-left': '20px',
    });
    container.appendTo('body');

    const chat_app = $('<div/>');
    chat_app.css({
      'width': 'calc(100% - 20px);',
      'width': '400px',
      'border-radius': '10px',
      'background-color': '#fff',
      'box-shadow': '0 10px 20px rgba(0, 0, 0, 0.15)',
      'background-color': '#f8f8f8',
      'overflow': 'hidden',
    });
    chat_app.appendTo(container);

    chatDOM.messages = $('<ul/>');
    chatDOM.messages.css({
      'position': 'relative',
      'list-style': 'none',
      'padding': '20px 10px 0 10px',
      'margin': '0px',
      'height': '347px',
      'overflow-y': 'scroll',
    });
    chatDOM.messages.appendTo(chat_app);

    const bottom = $('<div/>');
    bottom.css({
      'width': '100%',
      'background-color': '#fff',
      'padding': '20px 20px',
    });
    bottom.appendTo(chat_app);

    const input_wrapper = $('<div/>');
    input_wrapper.css({
      'display': 'inline-block',
      'height': '50px',
      'border-radius': '25px',
      'border': '1px solid #bcbdc0',
      'width': 'calc(100% - 160px)',
      'position': 'relative',
      'padding': '0 20px',
    });
    input_wrapper.appendTo(bottom);

    chatDOM.input = $('<input/>');
    chatDOM.input.attr('type','text');
    chatDOM.input.css({
      'border': 'none',
      'height': '100%',
      'box-sizing': 'border-box',
      'width': 'calc(100% - 40px)',
      'position': 'absolute',
      'outline-width': '0',
      'color': 'gray',
    });
    chatDOM.input.appendTo(input_wrapper);

    chatDOM.button = $('<div/>');
    chatDOM.button.css({
      'width': '140px',
      'height': '50px',
      'display': 'inline-block',
      'border-radius': '50px',
      'background-color': '#a3d063',
      'border': '2px solid #a3d063',
      'color': '#fff',
      'cursor': 'pointer',
      'transition': 'all 0.2s linear',
      'text-align': 'center',
      'float': 'right',
    });
    chatDOM.button.appendTo(bottom);

    const button_text = $('<div/>');
    button_text.html('Send');
    button_text.css({
      'font-size':' 18px',
    'font-weight':' 300',
    'display':' inline-block',
    'line-height':' 48px',
    'user-select':'none',
    });
    button_text.appendTo(chatDOM.button);
  };

  const addMessage = data => {
    const message = $('<li/>');
    message.css({
      'clear':' both',
      'overflow':' hidden',
      'margin-bottom':' 20px',
      'opacity': '0',
    });
    message.appendTo(chatDOM.messages);

    const avatar = $('<div/>');
    avatar.css({
      'width':' 60px',
      'height':' 60px',
      'border-radius':' 50%',
    });
    avatar.appendTo(message);

    const text_wrapper = $('<div/>');
    text_wrapper.css({
      'display':' inline-block',
      'padding':' 20px',
      'border-radius':' 6px',
      'width':' calc(100% - 85px)',
      'min-width':' 100px',
      'position':' relative',
    });
    text_wrapper.appendTo(message);

    const text = $('<div/>');
    text.html(data);
    text.css({
      'font-size':' 18px',
      'font-weight':' 300',
      'color':' #c48843',
    });
    text.appendTo(text_wrapper);

    updateScroll();

    return {
      avatar,
      text_wrapper,
      fadeIn: () => message.fadeTo(500,1),
    }

  };

  const addBotMessage = data => {
    const { avatar, text_wrapper, fadeIn } = addMessage(data);
    avatar.css({
      'background-color':' #f5886e',
      'float':' left',
    });

    text_wrapper.css({
      'background-color':' #ffe6cb',
      'margin-left':' 20px',
      'float': 'left',
    });

    fadeIn();
  }

  const addUserMessage = data => {
    const { avatar, text_wrapper, fadeIn } = addMessage(data);
    avatar.css({
      'background-color':' #fdbf68',
      'float':' right',
    });

    text_wrapper.css({
      'background-color':' #c7eafc',
      'margin-right':' 20px',
      'float': 'right',
    });

    fadeIn();
  }

  const getInputText = () => chatDOM.input.val();

  const clearInput = () => chatDOM.input.val('');

  const updateScroll = () => chatDOM.messages.animate({scrollTop: chatDOM.messages.get(0).scrollHeight},1000);

  const createChat = (settings,handleUserSendMessage) => {
       createChatDOM();
       console.log(chatDOM);
       addBotMessage(settings.open_message);
       chatDOM.button.on('click',handleUserSendMessage);
       chatDOM.input.on('keypress',(e) => e.which !== 13 || handleUserSendMessage(e));
  };

  return {
    createChat,
    addBotMessage,
    addUserMessage,
    getInputText,
    clearInput,
    updateScroll,
  }
})();

const ChatApp = (() => {
  const loadSettings = () => {
    return {
      open_message: 'Do you want to use our bot to measure your size?',
    }; 
  }
  const handleUserSendMessage = (e) => {
    console.log('client send!',e);
    const text = DOMHandler.getInputText();
    DOMHandler.clearInput();
    if(text !== ''){
      DOMHandler.addUserMessage(text);
    }
  }
  const init = () => {
    
    settings = loadSettings();
    DOMHandler.createChat(settings,handleUserSendMessage);


  };

  return {
    init,
    handleUserSendMessage,
  }
})();

$(document).ready(()=>{
  ChatApp.init();
});