import React from 'react';
import './ChatBubble.css';
function ChatBubble({text, top, left}) {
    return (
        <div class="talk-bubble tri-right chat-border round btm-left-in absolute" style={{top:top-100, left: left+40}}>
            <div class="talktext">
                <p>{text}</p>
            </div>
        </div>
    )
}

export default ChatBubble;
