alert('inserted any way!');

const DOMHandler = (() => {
  const create = (settings,events_handler) => {
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
      'height': '500px',
      'border-radius': '10px',
      'background-color': '#fff',
      'box-shadow': '0 10px 20px rgba(0, 0, 0, 0.15)',
      'background-color': '#f8f8f8',
      'overflow': 'hidden',
    });
    chat_app.appendTo(container);

    const messages = $('<ul/>');
    messages.css({
      'position': 'relative',
      'list-style': 'none',
      'padding': '20px 10px 0 10px',
      'margin': '0px',
      'height': '347px',
      'overflow': 'scroll',
    });
    messages.appendTo(chat_app);

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

    const input = $('<input/>');
    input.attr('type','text');
    input.css({
      'border': 'none',
      'height': '100%',
      'box-sizing': 'border-box',
      'width': 'calc(100% - 40px)',
      'position': 'absolute',
      'outline-width': '0',
      'color': 'gray',
    });
    input.appendTo(input_wrapper);

    const button = $('<div/>');
    button.css({
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
    button.appendTo(bottom);

    const button_text = $('<div/>');
    button_text.html('Send');
    button_text.css({
      'font-size':' 18px',
    'font-weight':' 300',
    'display':' inline-block',
    'line-height':' 48px',
    });
    button_text.appendTo(button);
    
  }

  return {
    create
  }
})();

const ChatApp = (() => {
  const loadSettings = () => {

  }
  const init = () => {
    
    settings = loadSettings();
    DOMHandler.create(settings,this);


  };

  return {
    init
  }
})();

$(document).ready(()=>{
  ChatApp.init();
});