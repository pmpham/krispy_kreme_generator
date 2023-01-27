function getKey(){
const axios = require('axios');

const anchor_url = 'https://www.google.com/recaptcha/api2/anchor?ar=1&k=6Lc4iwIaAAAAAHpijD7fQ_rJIdWZtvpodAsPt8AA&co=aHR0cHM6Ly93d3cua3Jpc3B5a3JlbWUuY29tOjQ0Mw..&hl=en&v=RGRQD9tdxHtnt-Bxkx9pM75S&size=normal&cb=k8i44cqg02oi'
var url_base = 'https://www.google.com/recaptcha/'
var re = new RegExp('([api2|enterprise]+)\/anchor\?(.*)');
var matches = anchor_url.match(re);
url_base += matches[0]+'/';
params = matches[1]
axios({
    method: 'GET',
    url: url_base + 'anchor',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    params: {params}
}).then(response => { 
    var re = new RegExp('"recaptcha-token" value="(.*?)"');
    var token = response.data.match(re)
    params2 = ""
    for (var pair of params.split('&')) {  
        params2 += pair.split('=')
    }
    var post_data = params2['v'] + token + params2['k'] + params2['co']
    var re = new RegExp('value="(.*?)"');
    var key = post_data.match(re)[0].split('"')[1]
    console.log(key)
    return(key)
}).catch(error => {
    console.log(error)
})
}