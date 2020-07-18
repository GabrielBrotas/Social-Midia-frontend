const formatToken = (token) => {
    if(token) {
        const tokenFormated =token.split(' ').slice(1, 3).join(' ')
        return tokenFormated
    } else {
        return undefined
    }
    
} 

export default formatToken
