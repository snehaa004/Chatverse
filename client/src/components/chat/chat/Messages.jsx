import { useState, useEffect, useContext, useRef } from 'react';
import { Box, styled } from '@mui/material';

import { io } from 'socket.io-client';

import { getMessages, newMessages } from '../../../service/api';
import { AccountContext } from '../../../context/AccountProvider';

//components
import Message from './Message';
import Footer from './Footer';

//for translation


const Wrapper = styled(Box)`
    background: #cfd6c4;
    background-size: 50%;
`;

const StyledFooter = styled(Box)`
    height: 55px;
    background: #ededed;
    // position: absolute;
    width: 100%;
    // bottom: 0
`;

const Component = styled(Box)`
    height: 80vh;
    overflow-y: scroll;
`;

const Container = styled(Box)`
    padding: 1px 80px;
`;



const Messages = ({ person, conversation }) => {

    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState(null);
    const [value, setValue] = useState();
    const [file, setFile] = useState();
    const [image, setImage] = useState();


    const scrollRef = useRef();

    const { account, socket, newMessageFlag, setNewMessageFlag } = useContext(AccountContext);

    useEffect(() => {
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                ...data,
                createdAt: Date.now()
            })
        })
    }, []);


    useEffect(() => {
        let active = true;
        const getMessageDetails = async () => {
            setLoading(true);
            setMessages([]);
            if (conversation?._id && account?.sub) {   
                try{
                    let data = await getMessages(conversation?._id, account.sub);
                    if (active) {
                        setMessages(data);
                } // 🔹 Check if conversation and account are defined
                
                } catch (error) {
                    console.error("Error fetching messages:", error);
                }
            }
            setLoading(false);
        }
        getMessageDetails();

        return () => {
            active = false; // 🧹 cleanup: stop outdated updates
        };

    }, [conversation?._id, person._id, newMessageFlag]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" })
    }, [messages]);

    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
            setMessages((prev) => [...prev, incomingMessage]);

    }, [incomingMessage, conversation]);

    const receiverId = conversation?.members?.find(member => member !== account.sub);

    const sendText = async (e) => {
        let code = e.keyCode || e.which;
        if (!value) return;

        if (code === 13) {
            let message = {};
            if (!file) {
                message = {
                    senderId: account.sub,
                    receiverId: receiverId,
                    conversationId: conversation._id,
                    type: 'text',
                    text: value
                };
            } else {
                message = {
                    senderId: account.sub,
                    conversationId: conversation._id,
                    receiverId: receiverId,
                    type: 'file',
                    text: image
                };
            }

            socket.current.emit('sendMessage', message);

            await newMessages(message);

            setValue('');
            setFile();
            setImage('');
            setNewMessageFlag(prev => !prev);
        }
    }

    return (
        <Wrapper>
            <Component>
                {
                    loading ? (
                        <p style={{ color: 'white', padding: '10px' }}>Loading messages...</p>
                    ) : (
                    messages && messages.map(message => (
                        <Container ref={scrollRef}>
                            <Message message={message} />
                        </Container>
                    ))
                )
                }
            </Component>
            <Footer
                sendText={sendText}
                value={value}
                setValue={setValue}
                setFile={setFile}
                file={file}
                setImage={setImage}
            />
        </Wrapper>
    )
}

export default Messages;