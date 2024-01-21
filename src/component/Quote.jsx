import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./Quote.css"


const Quote = () => {
    const [quote, setQuote] = useState(null);
    const [authorQuotes, setAuthorQuotes] = useState([]);
    const [author, setAuthor] = useState(null);
    const [listQuote, setListQuote] = useState([])
    useEffect(() => {
        fetchRandomQuote();
    }, []);

    const generateRandomInteger = (min, max) => {
        return Math.floor(min + Math.random() * (max - min + 1))
    }
    const fetchRandomQuote = async () => {
        try {
            const response = await axios.get('https://api.quotable.io/quotes');
            const data = response.data;
            setQuote(data.results[0]);
            setListQuote(data.results)
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleRandomQuoteClick = () => {
        const getramdom = generateRandomInteger(0, listQuote.length - 1)
        console.log("getramdom", getramdom)
        setQuote(listQuote[getramdom]);
        setAuthor(null);
        setAuthorQuotes([]);
    };

    const handleAuthorClick = () => {
        console.log("quote", quote)
        const getListQuoteOfAuthor = listQuote.filter(a => a.author === quote.author)
        setAuthor(quote.author)
        setAuthorQuotes(getListQuoteOfAuthor)
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
            <div className='random'>
                <button className='btn-random'
                    type="button"
                    onClick={handleRandomQuoteClick} >
                    random <i class="fa-solid fa-rotate"></i>
                </button>
            </div>
            {quote && (
                <div style={{ marginBottom: '15px', maxWidth: '350px' }}>
                    <div className='text-quote'>"{quote.content}"</div>
                    <div className='div-author' onClick={handleAuthorClick}>
                        <div className='text-author'>
                            <div>{quote.author}</div>
                            <div><i class="fa-solid fa-right-long"></i></div>
                        </div>
                        {quote.tags && quote.tags.length > 0 && (
                            <div className='tagName'>
                                {quote.tags.map((tag) => (
                                    <span
                                        className='tag-item'
                                        key={tag}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {author && (
                <div>
                    <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {author}
                    </p>
                    {authorQuotes.length > 0 ? (
                        authorQuotes.map((quote) => (
                            <div className='text-quote'>
                                <p>"{quote.content}"</p>
                            </div>
                        ))
                    ) : (
                        <p>No quotes found for this author.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Quote