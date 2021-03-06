getRealOffsetTop = ( offsetTop ) => {
    if( offsetTop > globals.headerHeight.static )
    {
        return offsetTop - globals.headerHeight.fixed;
    }

    return offsetTop;
}

swap = ( arr, i, j ) => {
    let tempVal;

    tempVal  = arr[ i ];
    arr[ i ] = arr[ j ];
    arr[ j ] = tempVal;

    return arr;
}

shuffle = ( arr ) => {
    let currentIndex = arr.length, tempVal, randomIndex;

    if( currentIndex === 2 && Math.random() > 0.5 )
    {
        swap( arr, 0, 1 );
    }
    else if( currentIndex > 2 )
    {
        while( 0 !== currentIndex )
        {
            randomIndex = Math.floor( Math.random() * currentIndex );
            currentIndex -= 1;

            swap( arr, currentIndex, randomIndex );
        }
    }

    return arr;
}

commonSubstring = ( prefix, suffix ) => {
    let commonSubstr = '';
    let i = 1;

    while( i <= suffix.length )
    {
        let str   = suffix.substring( 0, i );
        let index = prefix.indexOf( str );

        if( index !== -1 && index === prefix.length - str.length )
        {
            commonSubstr = str;
        }

        i++;
    }

    return commonSubstr;
}

longestCommonSubsequence = ( str1, str2 ) => {
    const lArr = new Array( str1.length + 1 );

    for( let i1 = 0; i1 <= str1.length; i1++ )
    {
        lArr[ i1 ] = new Array( str2.length + 1 ).fill( 0 );
    }

    for( let i1 = 1; i1 <= str1.length; i1++ )
    {
        for( let i2 = 1; i2 <= str2.length; i2++ )
        {
            if( str1[ i1 - 1 ] === str2[ i2 - 1 ] )
            {
                lArr[ i1 ][ i2 ] = lArr[ i1 - 1 ][ i2 - 1 ] + 1;
            }
            else
            {
                lArr[ i1 ][ i2 ] = Math.max( lArr[ i1 ][ i2 - 1 ], lArr[ i1 - 1 ][ i2 ] );
            }
        }
    }

    backtrack = ( arr, s1, s2, i, j ) => {
        if( i - 1 < 0 || j - 1 < 0 )
        {
            return '';
        }
        else if( s1[ i - 1 ] === s2[ j - 1 ] )
        {
            return backtrack( arr, s1, s2, i - 1, j - 1 ) + s1[ i - 1 ];
        }
        else if( arr[ i ][ j - 1 ] > arr[ i - 1 ][ j ] )
        {
            return backtrack( arr, s1, s2, i, j - 1 );
        }

        return backtrack( arr, s1, s2, i - 1, j );
    }

    return backtrack( lArr, str1, str2, str1.length, str2.length );
}

longestCommonSubstring = ( str1, str2 ) => {
    const lArr = new Array( str1.length + 1 );
    let len    = -1;
    let lcs    = '';
    let r      = 0;
    let c      = 0;

    for( i1 = 0; i1 <= str1.length; i1++ )
    {
        lArr[ i1 ] = new Array( str2.length + 1 ).fill( 0 );
    }

    for( i1 = 1; i1 <= str1.length; i1++ )
    {
        for( i2 = 1; i2 <= str2.length; i2++ )
        {
            if( str1[ i1 - 1 ] === str2[ i2 - 1 ] )
            {
                lArr[ i1 ][ i2 ] = lArr[ i1 - 1 ][ i2 - 1 ] + 1;

                if( len < lArr[ i1 ][ i2 ] )
                {
                    len = lArr[ i1 ][ i2 ];
                    r   = i1;
                    c   = i2;
                }
            }
            else
            {
                lArr[ i1 ][ i2 ] = 0;
            }
        }
    }

    if( len > 0 )
    {
        while( lArr[ r ][ c ] !== 0 )
        {
            lcs = str1[ r - 1 ] + lcs;
            r--;
            c--;
        }
    }

    return lcs;
}

merge = ( arr, p, q, r, aaa ) => {
    const t = [];

    for( let kk = p; kk <= r; kk++ )
    {
        t[ kk ] = arr[ kk ];
    }

    let i = p, j = q + 1, k = p;

    while( i <= q && j <= r )
    {
        if( t[ i ].value <= t[ j ].value )
        {
            arr[ k++ ] = t[ i++ ];
        }
        else
        {
            arr[ k++ ] = t[ j++ ];
        }
    }

    while( i <= q )
    {
        arr[ k++ ] = t[ i++ ];
    }

    return arr;
}

mergeSort = ( arr, p, r ) => {
    if( p < r )
    {
        const q = Math.floor( ( p + r ) / 2 );
        arr = mergeSort( arr, p, q );
        arr = mergeSort( arr, q + 1, r );

        return merge( arr, p, q, r );
    }

    return arr;
}

editDistance = ( str1, str2 ) => {
    const dist    = [];
    const str1len = str1.length + 1;
    const str2len = str2.length + 1;

    for( let i1 = 0; i1 < str1len; i1++ )
    {
        dist.push( [ i1 ] );

        for( let i2 = 1; i2 < str2len; i2++ )
        {
            const v = ( i1 > 0 ) ? 0 : i2;

            dist[ i1 ].push( v );
        }
    }

    for( let i2 = 1; i2 < str2len; i2++ )
    {
        for( let i1 = 1; i1 < str1len; i1++ )
        {
            if( str1[ i1 - 1 ] === str2[ i2 - 1 ] )
            {
                dist[ i1 ][ i2 ] = dist[ i1 - 1 ][ i2 - 1 ];
            }
            else
            {
                dist[ i1 ][ i2 ] = Math.min(
                    dist[ i1 - 1 ][ i2 ] + 1,
                    dist[ i1 ][ i2 - 1 ] + 1,
                    dist[ i1 - 1 ][ i2 - 1 ] + 1,
                );
            }
        }
    }

    return dist[ str1len - 1 ][ str2len - 1 ];
}

insertQuotes = ( str ) => {
    return str.replace( /,,/g, '\u201e' ).replace( /''/g, '\u201d' );
}

insertNbsp = ( str ) => {
    return str.replace( /(^|\s)\w\s/g, ( match, offset, string ) => {
        const end = ( match.length > 2) ? 2 : 1;
        return match.substring( 0, end ) + '\u00a0';
    } );
}

insertNdash = ( str ) => {
    return str.replace( /\-\-/g, '\u2013' );
}

insertLinks = ( string ) => {
    return string.split( /(\[.*?\]\(.*?\))/gi ).map( ( chunk, index ) => {
        if( chunk.indexOf( '[' ) === 0 && chunk.lastIndexOf( ')' ) === chunk.length - 1 )
        {
            const linkHref = chunk.substring( 1, chunk.lastIndexOf( ']' ) );
            const linkName = chunk.substring( chunk.indexOf( '(' ) + 1, chunk.length - 1 );
            return <a key={ index } target="_blank" href={ linkHref }>{ linkName }</a>;
        }

        return chunk;
    } );
}

parseText = ( string ) => {
    const chunks = [];

    string = insertQuotes( string );
    string = insertNbsp( string );
    string = insertNdash( string );

    return string.split( /(\*\*[^\*]*\*\*)/gi ).map( ( chunk, index ) => {
        if( chunk.indexOf( '\\\*\\\*' ) !== -1 )
        {
            chunk = chunk.replace( /\\\*\\\*/g, '**' );
        }

        chunk = insertLinks( chunk );
        chunk = chunk.map( ( smallerChunk, smallerChunkIndex ) => {
            const jsxElem  = ( typeof smallerChunk !== 'string' );
            const childStr = jsxElem ? smallerChunk.props.children : smallerChunk;

            if( childStr.indexOf( '**' ) === 0 && childStr.lastIndexOf( '**' ) === childStr.length - 2 )
            {
                const jsxChildElem = <span key={ smallerChunkIndex } className="text-important">{ childStr.substring( 2, smallerChunk.length - 2 ) }</span>

                return jsxElem ? {
                    ...jsxElem,
                    props : {
                        ...jsxElem.props,
                        children : jsxChildElem
                    }
                } : jsxChildElem
            }

            return smallerChunk;
        } );

        return chunk;
    } );
}

getRandomString = () => {
    return Math.random().toString( 36 ).substring( 2 );
}

getParameterByName = ( name, url ) => {
    if( !url )
    {
        url = window.location.href;
    }

    name = name.replace( /[\[\]]/g, '\\$&' );

    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);

    if( !results )
    {
        return null;
    }

    if( !results[ 2 ] )
    {
        return '';
    }

    return decodeURIComponent( results[ 2 ].replace( /\+/g, ' ' ) );
}

removeScenario = ( scenarios, type ) => {
    return scenarios.filter( scenario => {
        return scenario.tasks.filter( task => task.type.indexOf( type ) !== -1 ).length === 0;
    } );
}

const globals = {
    emailRegex      : /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    headerHeight    : {
        static : 256,
        fixed  : 35
    },
    keyDownDisabled : false,
    maxLength       : {
        input    : 64,
        textarea : 255
    },
    backURI         : ( window.location.host === ( 'front.mgr' || 'localhost' || '127.0.0.1' ) ? 'https://back.mgr' : 'https://data-entry-handler.herokuapp.com' ),
    dev             : getParameterByName( 'dev' ) !== null
}

window.onload = function() {
    document.onkeydown = event => {
        event = event || window.event;

        if( globals.keyDownDisabled && ( event.key === 'ArrowUp' || event.key === 'ArrowDown' ) )
        {
            return false;
        }
    };

    class Main extends React.Component {
        constructor( props )
        {
            super( props );

            this.handleToken          = this.handleToken.bind( this );
            this.handleFormChange     = this.handleFormChange.bind( this );
            this.handleScroll         = this.handleScroll.bind( this );
            this.handleStart          = this.handleStart.bind( this );
            this.handleFinish         = this.handleFinish.bind( this );
            this.handleScenarioFinish = this.handleScenarioFinish.bind( this );
            this.backToTop            = this.backToTop.bind( this );
            this.state                = {
                error                : null,
                isLoaded             : false,
                headerFixed          : false,
                testStarted          : false,
                testFinished         : false,
                scenarios            : [],
                currentScenarioIndex : 1,
                allScenariosFinished : false,
                dataSent             : false,
                form                 : {
                    error : false,
                    data  : [
                        {
                            type        : 'mask',
                            label       : 'Twój rok urodzenia',
                            id          : 'birthYear',
                            regex       : /^\d{4}$/,
                            mask        : '9999',
                            maxLength   : 4
                        },
                        {
                            type        : 'radio',
                            label       : 'Twoja płeć',
                            id          : 'sex',
                            options     : [ 'Mężczyzna', 'Kobieta' ]
                        },
                        {
                            type        : 'select',
                            label       : 'Twoje wykształcenie',
                            id          : 'education',
                            options     : [ 'Podstawowe lub gimnazjalne', 'Średnie', 'Wyższe' ]
                        },
                        {
                            type        : 'select',
                            label       : 'Twój zawód',
                            id          : 'job',
                            options     : [ 'Bezrobotny', 'Ekonomista', 'Informatyk', 'Lekarz', 'Pedagog', 'Pracownik biurowy', 'Prawnik', 'Student', 'Uczeń', 'Inny (jaki?)' ],
                            otherOption : true
                        },
                        {
                            type        : 'select',
                            label       : 'Jak często przeglądasz strony WWW?',
                            id          : 'frequency',
                            options     : [ '1 raz dziennie lub więcej', '1 raz w tygodniu lub więcej', 'Rzadziej niż 1 raz w tygodniu lub sporadycznie', 'Trudno powiedzieć' ]
                        },
                        {
                            type        : 'select',
                            label       : 'Główny powód, dla którego przeglądasz strony WWW',
                            id          : 'mainReason',
                            options     : [ 'Lektura wiadomości i artykułów w serwisach informacyjnych, branżowych lub specjalistycznych', 'Hobby', 'Kontakt ze znajomymi', 'Nauka', 'Praca', 'Rozrywka', 'Szybkie wyszukiwanie informacji', 'Zakupy online', 'Inny (jaki?)' ],
                            otherOption : true
                        },
                        {
                            type        : 'select',
                            label       : 'Którego urządzenia wskazującego używasz najczęściej do obsługi komputera stacjonarnego lub laptopa?',
                            id          : 'pointingDevice',
                            options     : [ 'Myszy', 'Touchpada (gładzika)', 'Ekranu dotykowego', 'Pióra świetlnego', 'Innego (jakiego?)' ],
                            otherOption : true
                        },
                        {
                            type        : 'radio',
                            label       : 'Czy przełączasz się między kolejnymi polami w formularzu przy użyciu klawisza Tab (o ile jest to możliwe)?',
                            id          : 'usingTab',
                            options     : [ 'Tak', 'Nie' ]
                        },
                        {
                            type        : 'radio',
                            label       : 'Czy prawidłowe wypełnianie formularzy na stronach WWW jest dla Ciebie czymś trudnym?',
                            id          : 'difficulties',
                            options     : [ 'Tak', 'Nie' ]
                        },
                        {
                            type        : 'radio',
                            label       : 'Czy, Twoim zdaniem, formularze na stronach WWW są odpowiednio zaprojektowane?',
                            id          : 'properDesign',
                            options     : [ 'Tak', 'Nie', 'Trudno powiedzieć' ]
                        },
                        {
                            type        : 'textarea',
                            label       : 'Czy którakolwiek z zaprezentowanych metod wprowadzania danych była dla Ciebie wyjątkowo uciążliwa lub niepraktyczna?',
                            id          : 'comment',
                            optional    : true,
                            value       : ''
                        }
                    ]
                },
                output : {
                    test : {
                        startTime : 0,
                        endTime   : 0,
                        scenarios : []
                    },
                    user : {}
                }
            }

            this.childNodeRef = child => {
                if( child !== null )
                {
                    window.scrollTo( 0, getRealOffsetTop( child.offsetTop ) );
                }
            }
        }

        getTestVersion()
        {
            return fetch( globals.backURI + '?do=get&what=count' ).then(
                res => res.json()
            ).then( response => {
                let count;

                for( let k = 0; k < response.length; k++ )
                {
                    if( typeof response[ k ].count !== 'undefined' )
                    {
                        count = response[ k ].count;
                        break;
                    }
                }

                if( count.A > count.B )
                {
                    return 'B';
                }
                else if( count.B > count.A )
                {
                    return 'A';
                }

                return ( ( Math.random() > 0.5 ) ? 'A' : 'B' );
            } ).catch( error => {
                console.error( error );

                return false;
            } );
        }

        getIPAddress()
        {
            return fetch( 'https://api.ipify.org/?format=json' ).then(
                res => res.json()
            ).then( response => {
                if( typeof response.ip !== 'undefined' )
                {
                    return response.ip;
                }

                return false;
            } ).catch( error => {
                return false;
            } );
        }

        loadTest( version )
        {
            const fileURI = './json/test-' + version + '.json';

            fetch( fileURI ).then(
                res => res.json()
            ).then( result => {
                this.setState( oldState => {
                    const newState = {
                        ...oldState,
                        scenarios : shuffle( result.scenarios ),
                        isLoaded  : true,
                        output    : {
                            ...oldState.output,
                            test : {
                                ...oldState.output.test,
                                version : version
                            }
                        }
                    }

                    const speechRecognitionScenario = result.scenarios.filter( scenario => scenario.tasks.filter( task => task.type.indexOf( 'speech-recognition-on' ) !== -1 ).length > 0 ).length > 0;
                    const geolocationScenario       = result.scenarios.filter( scenario => scenario.tasks.filter( task => task.type.indexOf( 'geolocation-on' ) !== -1 ).length > 0 ).length > 0;

                    if( geolocationScenario || speechRecognitionScenario )
                    {
                        const isChrome           = ( navigator.userAgent.toLowerCase().indexOf( 'opr' ) === -1 ) && ( navigator.userAgent.toLowerCase().indexOf( 'vivaldi' ) === -1 ) && !!window.chrome && ( !!window.chrome.webstore || !!window.chrome.runtime );
                        const noSpeechRecogniton = !( isChrome && window.hasOwnProperty( 'webkitSpeechRecognition' ) );
                        const noGeolocation      = !( 'geolocation' in navigator );

                        if( geolocationScenario )
                        {
                            this.setState( {
                                showGeolocationNote : true
                            } );
                        }

                        if( speechRecognitionScenario )
                        {
                            this.setState( {
                                showSpeechRecognitionNote : true
                            } );
                        }

                        if( noSpeechRecogniton )
                        {
                            newState.scenarios = removeScenario( newState.scenarios, 'speech-recognition-on' );
                        }

                        if( noGeolocation )
                        {
                            newState.scenarios = removeScenario( newState.scenarios, 'geolocation-on' );
                        }

                        if( noSpeechRecogniton || noGeolocation )
                        {
                            const alertMsg = 'Przeglądarka internetowa, której właśnie używasz, nie posiada funkcjonalności' + ( noSpeechRecogniton || noGeolocation ? ' ' : '' ) + ( noSpeechRecogniton ? 'rozpoznawania mowy' : '' ) + ( noSpeechRecogniton && noGeolocation ? ' i ' : '' ) + ( noGeolocation ? 'pobierania lokalizacji użytkownika' : '' ) + ( !noSpeechRecogniton || !noGeolocation ? ' wykorzystywanej ' : ' wykorzystywanych ' )  + 'w części ćwiczeń. Jeśli istnieje taka możliwość, uruchom, proszę, tę stronę w przeglądarce Google Chrome -- możesz ją pobrać [https://www.google.com/intl/pl/chrome/](tutaj).';

                            newState.alert = {
                                type : 'warning',
                                msg  : alertMsg
                            };
                        }
                    }

                    return newState;
                }, () => {
                    window.addEventListener( 'scroll', this.handleScroll );
                } );
            }, error => {
                this.setState( {
                    isLoaded : false,
                    error
                } );
            } );
        }

        handleToken()
        {
            return fetch( globals.backURI + '?do=check&what=token&value=' + getParameterByName( 'auth' ) ).then( res => res.json() ).then( response => {
                response = ( response.length > 0 ) ? response[ 0 ] : false;

                if( response.type === 'success' )
                {
                    return {
                        expired : response.valid === false,
                        valid   : response.valid
                    };
                }

                return false;

            } ).catch( error => {
                console.error( error );
                return false;
            } );
        }

        componentDidMount()
        {
            this.getIPAddress().then( ip => {
                if( ip )
                {
                    this.setState( state => {
                        return {
                            ...state,
                            output    : {
                                ...state.output,
                                user : {
                                    ...state.output.user,
                                    ip : ip
                                }
                            }
                        }
                    } );

                    globals.ip = ip;
                }
                else
                {
                    globals.ip = 'N/A_' + new Date.getTime()
                }
            } );

            this.handleToken().then( token => {
                if( token.valid )
                {
                    window.onbeforeunload = ( event ) => {
                        if( !( this.state.testStarted && this.state.testFinished && this.state.dataSent ) )
                        {
                            event.preventDefault();
                            event.returnValue = '';
                        }
                    }

                    if( !globals.dev )
                    {
                        this.getTestVersion().then( version => {
                            if( version !== false )
                            {
                                this.loadTest( version );
                            }
                        } );
                    }
                    else
                    {
                        const searchValue = getParameterByName( 'ver' );
                        const version     = ( ( searchValue === 'A' || searchValue === 'B' || searchValue === 'dev' ) ? searchValue : 'A' )

                        this.loadTest( version );
                    }
                }
                else
                {
                    document.title   = token.expired ? '666 Authorization Expired' : '403 Forbidden';
                    document.body.id = 'simple-page';

                    for ( let styleSheet of document.styleSheets )
                    {
                        styleSheet.disabled = true;
                    }

                    this.setState( {
                        isLoaded        : true,
                        tokenExpired    : token.expired,
                        otherTokenError : !token.expired
                    } );
                }
            } );
        }

        backToTop()
        {
            window.scrollTo( 0, 0 );
        }

        handleScroll()
        {
            if( window.scrollY > globals.headerHeight.static )
            {
                this.setState( {
                    headerFixed : true
                } );
            }
            else
            {
                this.setState( {
                    headerFixed : false
                } );
            }
        }

        handleFormChange( input )
        {
            if( this.state.allScenariosFinished && !this.state.testFinished )
            {
                this.setState( state => {
                    const data = state.form.data.map( ( item, itemIndex ) => {
                        if( itemIndex === input.index )
                        {
                            return {
                                ...item,
                                valid : input.valid,
                                value : input.value
                            };
                        }

                        return item;
                    } );

                    return {
                        ...state,
                        form : {
                            ...state.form,
                            data
                        }
                    };
                }, () => {
                    if( this.state.form.data.filter( item => !item.optional && !item.valid ).length === 0 )
                    {
                        this.setState( state => {
                            return {
                                ...state,
                                form : {
                                    ...state.form,
                                    error : false
                                }
                            };
                        } );
                    }
                } );
            }
        }

        handleStart()
        {
            if( !this.state.testStarted )
            {
                this.setState( state => {
                    return {
                        ...state,
                        testStarted : true,
                        output      : {
                            ...state.output,
                            test : {
                                ...state.output.test,
                                startTime : new Date().getTime()
                            }
                        }
                    }
                } );
            }
        }

        handleScenarioFinish( scenario )
        {
            let { index, ...data } = scenario;

            if( this.state.testStarted && this.state.currentScenarioIndex === index )
            {
                this.setState( state => {
                    const scenarios = state.output.test.scenarios;
                    scenarios.push( data );

                    return {
                        ...state,
                        output : {
                            ...state.output,
                            test : {
                                ...state.output.test,
                                scenarios
                            }
                        }
                    }
                } );

                if( this.state.currentScenarioIndex === this.state.scenarios.length )
                {
                    this.setState( {
                        allScenariosFinished : true
                    } );
                }
                else
                {
                    this.setState( {
                        currentScenarioIndex : this.state.currentScenarioIndex + 1
                    } );
                }
            }
        }

        handleFinish()
        {
            if( this.state.allScenariosFinished && !this.state.testFinished )
            {
                if( this.state.form.data.filter( input => !input.valid && !input.optional ).length > 0 )
                {
                    this.setState( state => {
                        return {
                            ...state,
                            form : {
                                ...state.form,
                                error : true
                            }
                        };
                    } );
                }
                else
                {
                    this.setState( state => {
                        return {
                            ...state,
                            testFinished : true,
                            output      : {
                                ...state.output,
                                test : {
                                    ...state.output.test,
                                    endTime : new Date().getTime()
                                }
                            }
                        }
                    }, () => {
                        let output   = this.state.output;
                        let userData = output.user;

                        for( let k = 0; k < this.state.form.data.length; k++ )
                        {
                            const input = this.state.form.data[ k ];
                            userData[ input.id ] = input.value;
                        }

                        output = {
                            ...output,
                            user : userData
                        };

                        if( globals.dev )
                        {
                            console.log( output );
                        }

                        fetch( globals.backURI + '/?do=send&what=data', {
                            method  : 'POST',
                            body    : JSON.stringify( output ),
                            headers : {
                                'Content-Type' : 'application/json'
                            }
                        } ).then(
                            res => res.json()
                        ).then( response => {
                            if( globals.dev )
                            {
                                console.log( 'fetch()', response )
                            }
                        } ).catch( error => {
                            console.error( error );
                        } ).then( () => {
                            fetch( globals.backURI + '/?do=delete&what=token&value=' + getParameterByName( 'auth' ) ).catch( error => {
                                console.error( error );
                            } ).then( () => {
                                this.setState( {
                                    dataSent : true
                                } );
                            } );
                        } );
                    } );
                }
            }
        }

        render()
        {
            const { error, isLoaded, scenarios, tokenExpired, otherTokenError } = this.state;

            if( otherTokenError || tokenExpired )
            {
                return(
                    <React.Fragment>
                        <h1>{ otherTokenError ? "Forbidden" : "Authorization Expired" }</h1>
                        <p>
                            { otherTokenError ? "Aby wziąć udział w badaniu użyteczności, musisz otrzymać ode mnie specjalny kod autoryzacyjny." : "Twój kod autoryzacyjny stracił ważność." }
                            <br/>
                            Wyślij do mnie <a href="mailto:krzysztof.radoslaw.osada@gmail.com">maila</a> lub napisz na <a href="https://fb.me/osada.krzysztof" target="_blank">Facebooku</a> w celu rozwiązania tego problemu.</p>
                        <hr/>
                        <address>Copyright &copy; 2019 Krzysztof Osada</address>
                    </React.Fragment>
                );
            }
            else if( error )
            {
                return <div>Error: { error.message }</div>;
            }
            else if( !isLoaded )
            {
                return <Loader display={ true } big={ true } alignCenter={ true } />;
            }
            else
            {
                return (
                    <div className={ this.state.headerFixed ? "header-fixed" : undefined } id="page-container">
                        <header>
                            <p>
                                <span>Badanie użyteczności</span>
                                { this.state.headerFixed &&
                                    <span>
                                        { !this.state.allScenariosFinished &&
                                            "scenariusz " + this.state.currentScenarioIndex + "/" + this.state.scenarios.length

                                        }
                                        { this.state.allScenariosFinished &&
                                            "podsumowanie"
                                        }
                                    </span>
                                }
                                { this.state.headerFixed &&
                                    <i className="material-icons" onClick={ this.backToTop }>
                                        arrow_upward
                                    </i>
                                }
                            </p>
                        </header>
                        <main>
                            <section className="test-intro">
                                <p>Witaj! Niniejsze badanie jest częścią mojej pracy dyplomowej i&nbsp;ma na celu zbadanie <span className="text-important">użyteczności</span> wybranych wzorców pól i&nbsp;metod wprowadzania danych, z&nbsp;którymi masz na co dzień styczność w&nbsp;wielu aplikacjach webowych i&nbsp;na stronach internetowych.</p>
                                <p>
                                    <span className="text-important">Co będę robił?</span> Zostaniesz poproszony(-a) o&nbsp;wykonanie <span className="text-important">18 ćwiczeń</span> zawartych w&nbsp;<span className="text-important">9 scenariuszach</span> i&nbsp;polegających na uzupełnieniu różnego typu formularzy.
                                    <br />
                                    <span className="text-important">Ile to potrwa?</span> Jeśli korzystanie z&nbsp;klawiatury i&nbsp;myszy nie jest dla Ciebie wielkim wyzwaniem, to przejście przez wszystkie etapy badania powinno zająć nie więcej niż <span className="text-important">około 20 min</span> Twojego cennego czasu.
                                    <br />
                                    <span className="text-important">Czy będę musiał(-a) podawać jakieś dane?</span> Większość ćwiczeń polega na wprowadzeniu całkowicie fikcyjnych danych{ this.state.showGeolocationNote ? "*" : "" }. Potraktuj więc całe badanie jako pewnego rodzaju zabawę, w&nbsp;której wypróbowujesz różne rozwiązania! W&nbsp;każdym ćwiczeniu zobaczysz dwie kolumny: pierwsza zawiera dane, które masz za zadanie wprowadzić, i&nbsp;jest wyróżniona <span className="text-important text-alert">tym kolorem,</span> natomiast druga to formularz, wyróżniający się <span className="text-important text-okay">tym kolorem,</span> do którego te dane wprowadzisz. Spójrz na poniższy przykład:
                                </p>
                            </section>
                            <section className="task-main-container test-intro">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Nazwa pola</th>
                                            <th>Prawidłowa wartość</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Pole I</td>
                                            <td>Wartość I</td>
                                        </tr>
                                        <tr>
                                            <td>Pole II</td>
                                            <td>Wartość II</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p className="note">Przykładowa tabela z danymi.</p>
                                <section className="form labels-align-left">
                                    <h3>Wzór formularza</h3>
                                    <InputWrapper disabled={ true } type="text" insideTask={ true } label="Pole I"/>
                                    <InputWrapper disabled={ true } type="text" insideTask={ true } label="Pole II"/>
                                </section>
                                <p className="note">Przykładowy formularz.</p>
                            </section>
                            <section className="test-intro">
                                <p>
                                    Nic trudnego, prawda? Wystarczy, że przeniesiesz wartości z tabeli do formularza w stosunku 1:1.
                                    <br />
                                    <span className="text-important">Na co mam zwrócić uwagę?</span> Odstępy, znaki pisarskie, interpunkcyjne są niezwykle istotne w&nbsp;tym badaniu. Ćwiczenie jest uznane za poprawnie rozwiązane wtedy i&nbsp;tylko wtedy, gdy wprowadzone dane odpowiadają danym wzorcowym{ this.state.showSpeechRecognitionNote ? ( this.state.showGeolocationNote ? "**" : "*" ) : "" }. Jeśli zatem wpisane przez Ciebie wartości będą zawierać błędy, to dane pole wraz z&nbsp;odpowiadającą mu etykietą zostaną wyróżnione <span className="text-important text-error">tym kolorem.</span>
                                    <br />
                                    <span className="text-important">Czy nie mogę po prostu kopiować i&nbsp;wklejać?</span> Zaznaczanie (a co za tym idzie &ndash; kopiowanie) danych w&nbsp;tej aplikacji jest z&nbsp;zasady zablokowane. Jasne jest, że przy odrobinie sprytu i&nbsp;wiedzy z&nbsp;dziedziny informatyki był(a)byś w&nbsp;stanie to zrobić, jednak nie rób tego, proszę. Celem tego badania jest zebranie relewantnych i&nbsp;wiarygodnych danych, które będę mógł przedstawić w&nbsp;swojej pracy, a&nbsp;będzie to możliwe tylko wtedy, gdy wszystkie pola wypełnisz ręcznie.
                                    <br />
                                    <span className="text-important">A mógłbym napisać, co o tym wszystkim myślę?</span> Po każdym ćwiczeniu będziesz miał(a) możliwość pozostawienia komentarza odnoszącego się do właśnie wypróbowanej metody wprowadzania danych. Komentarz nie jest obowiązkowy, jednak dzięki niemu będę mógł poznać Twój punkt widzenia.
                                </p>
                                <p>
                                    <span className="text-important">Co dalej?</span> Naciśnij przycisk <button className="smaller inline dummy">OK, zaczynajmy</button> i&nbsp;zmierz się ze stojącym przed Tobą wyzwaniem!
                                </p>
                                <p className="text-smaller">
                                    { this.state.showGeolocationNote &&
                                        <React.Fragment>
                                            *) Jedno z&nbsp;ćwiczeń zakłada ręczne lub zautomatyzowane wprowadzenie podstawowych informacji na temat Twojej lokalizacji (kraj, województwo, powiat, miasto, kod pocztowy). Jeśli nie wyrazisz na to zgody, będziesz mógł podać inne, mające podobną formę dane.
                                            <br />
                                        </React.Fragment>
                                    }
                                    { this.state.showSpeechRecognitionNote &&
                                        <React.Fragment>
                                            *{ this.state.showGeolocationNote ? "*" : "" }) Jedno z&nbsp;ćwiczeń jest skonstruowane w&nbsp;taki sposób, że nie będziesz musiał przejmować się ani odstępami, ani wielkością znaków. Dlaczego? Przekonasz się sam!
                                            <br />
                                        </React.Fragment>
                                    }
                                    <span className="text-important">Uwaga!</span> Badanie kończy się ankietą użytkownika, w&nbsp;której podasz dane związane z&nbsp;Twoją osobą, m.in. rok urodzenia, wykształcenie, zawód itd. Informacje te umożliwią przypisanie Twojej osoby pod względem uzyskanych wyników do poszczególnych grup całej populacji uczestników badania. Jeżeli masz jakieś uwagi, pytania lub sugestie związane z&nbsp;gromadzeniem tych danych, napisz do mnie na adres <a href="mailto:krzysztof.radoslaw.osada@gmail.com">krzysztof.radoslaw.osada@gmail.com</a>.
                                </p>
                                { this.state.alert &&
                                    <Paragraph content={ this.state.alert.msg } class={ "alert " + this.state.alert.type } />
                                }
                                <button onClick={ this.handleStart } disabled={ this.state.testStarted }>OK, zaczynajmy</button>
                            </section>
                            { scenarios.map( ( scenario, index ) =>
                                <Scenario key={ index } index={ index + 1 } testStarted={ this.state.testStarted } currentIndex={ this.state.currentScenarioIndex } lastIndex={ this.state.scenarios.length } scenario={ scenario } onFinish={ this.handleScenarioFinish } nodeRef={ this.childNodeRef } />
                            ) }
                            { this.state.allScenariosFinished &&
                                <section ref={ this.childNodeRef }>
                                    <h1>Zakończenie</h1>
                                    <Paragraph content="Świetnie! **Właśnie zakończyłeś(-aś) badanie użyteczności.** Zanim jednak zamkniesz tę kartę i wrócisz do swoich zajęć, wypełnij, proszę, poniższą ankietę -- podaj podstawowe informacje na swój temat* oraz podziel się odczuciami związanymi z formularzami na stronach internetowych." />
                                    <Paragraph class="text-smaller" content="*) **Informacje gromadzone w badaniu użyteczności nie pozwalają na jednoznaczne zidentyfikowanie danej osoby.** Celem niniejszej ankiety jest z kolei kategoryzacja uczestników badania według cech mogących mieć wpływ na szybkość, poprawność i dokładność wprowadzania danych w formularzach internetowych. Poniższe informacje pozwolą więc na dostrzeżenie zależności między wynikami uzyskanymi przez Ciebie w badaniu a parametrami dotyczącymi Twojego wykształcenia, wieku, Twoich doświadczeń ze stronami internetowymi itp. Jeżeli masz jakieś pytania lub uwagi związane z poniższą ankietą, wyślij do mnie wiadomość na adres [mailto:krzysztof.radoslaw.osada@gmail.com](krzysztof.radoslaw.osada@gmail.com)." />
                                    <section className="form labels-align-top" id="user-form">
                                        <h3>Ankieta uczestnika</h3>
                                        {
                                            this.state.form.data.map( ( item, index ) =>
                                                <InputWrapper key={ index } index={ index } error={ this.state.form.error } disabled={ this.state.testFinished } onChange={ this.handleFormChange } { ...item }/>
                                            )
                                        }
                                        { this.state.form.error &&
                                            <Paragraph class="on-form-error" content="Aby przejść dalej, popraw pola wyróżnione **tym kolorem.**" />
                                        }
                                    </section>
                                    <button onClick={ this.handleFinish } disabled={ this.state.testFinished }>Wyślij</button>
                                    { this.state.testFinished &&
                                        <Loader nodeRef={ this.childNodeRef } display={ !this.state.dataSent }/>
                                    }
                                </section>
                            }
                            { this.state.testFinished && this.state.dataSent &&
                                <section ref={ this.childNodeRef }>
                                    <Paragraph content="**I tak doszliśmy do końca!** Serdecznie dziękuję za udział w badaniu -- Twoja pomoc jest dla mnie naprawdę nieoceniona. Uzyskane przez Ciebie wyniki zostaną uwzględnione w części badawczej mojej pracy dyplomowej ,,Badanie użyteczności metod wprowadzania danych w aplikacjach webowych'', którą piszę pod kierunkiem dr. hab. inż. Bogdana Trawińskiego, prof. PWr." />
                                </section>
                            }
                        </main>
                    </div>
                );
            }
        }
    }

    ReactDOM.render(
        <Main />,
        document.getElementById( 'root' )
    );
};