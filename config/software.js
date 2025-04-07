/*
 This file contains the logic for custom software programs
 that perform more complex actions than just displaying some text or HTML.

 You are invited to edit this file to define your own commands!
 Start by removing the demo ones that you don't need for your game.

 Remember that function names must match the names of the programs in software.json.
 */
/* eslint-disable no-inner-declarations, no-nested-ternary, no-sequences, no-unused-vars */


function hack( args ) {
    output( `Hacking: '${ args[ 0 ] }'` );
    output( {
        delayed: 1000,
        text: [
            "Scanning accounts",
            "ROOT account found - cracking passwords",
            "Verifying keys: <span class=hack-reveal data-alphabet=uppercase data-iterations-before-reveal=12 data-preserve-spaces=true>yi!B4iqprfmRojxvP*HC</span>"
        ]
    } ).then( () => {
        hidePrompt();
        setTimeout( () => {
            output( "Password found - logging in" );
        }, 2500 );
        setTimeout( () => {
            showPrompt();
            system.login( [ "admin:admin" ] );
        }, 4000 );
    } );
}

function hidePrompt() {
    console.log( "hiding prompt" );
    $( ".input-line" ).last().hide();
}

function showPrompt() {
    console.log( "showing prompt" );
    $( ".input-line" ).last().show();
}

function updateProgress( location, char, len, value, resolve ) {
    console.log("Char", char);
    const full = char.repeat( value );
    const empty = "&nbsp;".repeat( len - value );

    location.innerHTML = full + empty;

    if ( len === value ) {
        resolve();
    } else {
        const timeout = 50 + Math.floor( Math.random() * 201 );
        setTimeout( updateProgress, timeout, location, char, len, value + 1, resolve );
    }
}

function doEncrypt() {
    return new Promise( ( resolve ) => {
        output( "Enter encryption key: [<span id=\"enckey\"></span>]" )
            .then( () => {
                const progressbar = $( "#enckey" )[ 0 ];
                updateProgress( progressbar, "*", 8, 0, resolve );
            } );
    } );
}

function doCopy() {
    return new Promise( ( resolve ) => {
        output( "Copying: [<span id=\"copydata\"></span>]" )
            .then( () => {
                const progressbar = $( "#copydata" )[ 0 ];
                updateProgress( progressbar, "#", 15, 0, resolve );
            } );
    } );
}

function doErase() {
    return new Promise( ( resolve ) => {
        output( "Erasing: [<span id=\"erasedata\"></span>]" )
            .then( () => {
                const progressbar = $( "#erasedata" )[ 0 ];
                updateProgress( progressbar, "#", 15, 0, resolve );
            } );
    } );
}

function exfiltrate( args ) {
    return new Promise( ( resolve ) => {
        hidePrompt();
        output( `Copying and destroying '${ args[ 0 ] }'` );
        output( "<br/>" );
        doEncrypt().then( () => {
            doCopy().then( () => {
                doErase().then( () => {
                    output( "Data confirmed destroyed" );
                    showPrompt();
                } );
            } );
        } );
    } );
}

function dump( args ) {
    return new Promise( () => {

        output( `Accessing database '${ args[ 0 ] }'` );
        output( "Encrypted data found" );
        output( {
            delayed: 1000,
            text: [
                "Scanning memory for encryption keys....",
                "Verifying keys: <span class=hack-reveal data-alphabet=uppercase data-iterations-before-reveal=12 data-preserve-spaces=true>A4FB453FF901</span>",
                "Valid key found - decrypting",
                "<br/>"
            ]

        } ).then( () => {
            output( {
                delayed: 200,
                text: [
                    `Database: '${ args[ 0 ] }' Table: '#scientists'`,
                    "Security Clearance: <span class=blink>MK Ultra</span>",
                    "<br/>",
                    "<p style='white-space: pre'>|---------Name---------|-Zone-|---Location---|--Status--|</p>",
                    "<p style='white-space: pre'>| Dr John Smith        |  Q   | UNIT, UK     |  Omega   |</p>",
                    "<p style='white-space: pre'>| Dr Annie Tyler       |  A   | Unknown      |  Omicron |</p>",
                    "<p style='white-space: pre'>| Dr Margaret Davidson |  A   | Krakow, PL   |  Gamma   |</p>",
                    "<p style='white-space: pre'>| Dr Kathleen Power    |  L   | London, UK   |  Alpha   |</p>",
                    "<p style='white-space: pre'>| Dr Sharon Morris     |  A   | Paris, FR    |  Delta   |</p>",
                    "<p style='white-space: pre'>| Dr Eddie Clargo      |  C   | Berlin, DE   |  Beta    |</p>",
                    "<p style='white-space: pre'>| Professor Elemental  |  Q   | Brighton, UK |  Sigma   |</p>",
                    "<p style='white-space: pre'>| Dr Hannah Owen       |  K   | Swindon, UK  |  Alpha   |</p>",
                    "<p style='white-space: pre'>| Dr James Todd        |  K   | Reading, UK  |  Phi     |</p>",
                    "<p style='white-space: pre'>| Dr Eric Wolstenholme |  B   | Uppsala, SE  |  Gamma   |</p>",
                    "<p style='white-space: pre'>|----------------------|------|--------------|----------|</p>"
                ]
            } ).then( () => {
                $( ".cmdline" ).focus();
            } );
        } );
    } );
}

function find( args ) {
    return new Promise( () => {
        output( `Finding '${ args[ 0 ] }'` ).then( () => {
            output( {
                delayed: 2000,
                text: [
                    "Searching active memory...",
                    "&nbsp;0 results"
                ]
            } ).then( () => {
                output( {
                    delayed: 1500,
                    text: [
                        "Searching garbage files...",
                        "&nbsp;0 results"
                    ]
                } ).then( () => {
                    output( {
                        delayed: 1000,
                        text: [
                            "Searching databases...",
                            "&nbsp;$coredata#scientists"
                        ]
                    } ).then( () => {
                        output( "&nbsp;1 result" );
                        $( ".cmdline" ).focus();
                    } );
                } );
            } );
        } );
    } );
}


function decrypt( args ) { // The same function can be used to encode text
    if ( args.length === 0 ) {
        return "<p>Some encrypted text must be provided: <code>decrypt 53CR3T T3XT</code></p>";
    }
    const textInClear = rot13( args.join( " " ) );
    return `<p class="hack-reveal">${ textInClear }</p>`;
}
function rot13( s ) { // cf. https://en.wikipedia.org/wiki/ROT13
    return s.replace( /[a-zA-Z]/g, ( c ) => String.fromCharCode( ( c <= "Z" ? 90 : 122 ) >= ( c = c.charCodeAt( 0 ) + 13 ) ? c : c - 26 ) );
}

function identify() {
    const introMsg = [ "What is this?", `<img src="https://thisartworkdoesnotexist.com/?${ performance.now() }" style="width: 10rem; max-width: 100%;">` ];
    return { message: introMsg, onInput( answer ) {
        return `Wrong! This is not "${ answer }"`;
    } };
}

function artifact( args ) {
    if ( args.length === 0 ) {
        return [ "<p>An ID must be provided: <code>artifact $id</code></p>", `You currently have access to the following artifacts: ${ Object.keys( DWEETS ).join( " " ) }` ];
    }
    const artifactId = args[ 0 ];
    const artifactDweet = DWEETS[ artifactId ];
    if ( !artifactDweet ) {
        return `You do not have access to the artifact with ID ${ artifactId }`;
    }
    return artifactDweet();
}

const DWEETS = {
    888: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/888
        for ( let i = 0; i < 300; i++ ) {
            for ( let j = 0; j < 6; j++ ) {
                x.fillRect( 100 + 66 * C( i ) * S( T( t / 1.1 ) + j / i ), 100 + 66 * S( i ), 2, 2 );
            }
        }
    } ),
    1829: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/1829
        for ( let i = 16; i--; ) {
            x.ellipse( 100 + 60 * S( t + i * 0.1 ), 100 + 10 * C( t + i * 0.1 ), 32 * S( -i * 0.5 ) + 32, 10 * S( i * 0.1 ) + 1, 1.6 + 0.5 * S( t * 0.5 ), 9.5, 0, true );
            //         x,                           y,                           radiusX,                 radiusY,               rotation,                 startAngle, endAngle, counterclockwise
        }
        x.stroke();
    } ),
    1231: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/1231
        for ( let i = 9; i < 2e3; i += 2 ) {
            const s = 3 / ( 9.1 - ( t + i / 99 ) % 9 );
            x.beginPath();
            const j = i * 7 + S( i * 4 + t + S( t ) );
            x.lineWidth = s * s;
            x.arc( 100, 100, s * 49, j, j + 0.6 );
            x.stroke();
        }
    } ),
    10534: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/10534
        t += 160;
        let n;
        for ( let i = 2e3; i--; ) {
            const p = i & 1;
            const m = ( t / C( t / i ) + p * ( t / 2 + i % t ) ) / 5;
            const s = ( 3 - C( n ) * 3 ) / 3;
            x.fillRect( 100 + m * S( n = t / 9 + i * i ) * C( !p * i / t ), 100 + m * C( n + p * 2 ), s, s );
        }
    } ),
    5600: () => dweet( ( t, x, c ) => { // FROM: https://www.dwitter.net/d/5600
        const h = c.width;
        for ( let i = h; i--; ) {
            if ( C( t - i ) > 0 ) {
                x.fillText( ".⬤"[ "榁翻꺿듻ퟝ믭󫥤큰삗⢠挎ᩐ肦䰠椉䠊ᑒꊐࢀင".charCodeAt( i / 16 ) >> i % 16 & 1 ], 192 + ( ( i * h - i * i ) ** 0.5 ) * S( t - i ) / 2, i / 2 + 9 );
            }
        }
    }, 432, 230 ),
    629: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/629
        const a = 629;
        for ( let i = a; i--; ) {
            const s = -15 / ( ( i + t * 60 ) % a );
            const X = a * S( i * 0.31 ) * s + 100;
            const Y = a * C( i * 0.3 ) * s + 100;
            x.fillRect( X, Y, s * 9, s * 9 );
            x.lineTo( X, Y );
        }
        x.stroke();
    } ),
    3822: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/3822
        for ( let i = 0; i < 999; i++ ) {
            x.fillStyle = R( i % 300, i % 255, i % 320 );
            x.fillRect( 100 + 50 * S( i + t ), 100 + 50 * S( i ) + T( t - i ), 3, 3 );
        }
    } ),
    6494: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/6494
        for ( let i = 64; i--; ) {
            x.setTransform( 1, 0, 0, 1, i % 8 * 100, ( i >> 3 ) * 60 );
            for ( let j = 99; j--; ) {
                x.fillRect( 40 + C( t + j / 4 ) * 20, 20 + S( j * i ) * 20, 2, 2 );
            }
        }
    }, 800, 402 ),
    4342: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/4342
        const v = t + 400;
        for ( let q = 255; q--; ) {
            x.fillStyle = R( q, q, q );
            x.beginPath();
            x.arc( 210 + C( v - q ) * ( v + q ) / 4, 110 + S( v - q ) * ( v - q ) / 4, 10, 0, 6.283, !1 );
            x.fill();
        }
    }, 420, 220 ),
    7495: () => dweet( ( t, x, c ) => { // FROM: https://www.dwitter.net/d/7495
        for ( let i = 16; i--; x.stroke() & x.drawImage( c, x.globalAlpha = 0.1, i ) ) {
            t += ( 7 - i ) % 2 / 0.64;
            const Z = ( t < 6 ) + 1 + C( t );
            x.lineTo( 200 + S( t ) * 100 / Z, 50 + ( ( i % 4 / 2 << 6 ) - 25 ) / Z );
        }
    }, 400 ),
    13326: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/13326
        for ( let i = 0; i < 2e3; ) {
            const F = 260 * ( t + 9 ) / i + S( i * i );
            const K = i++ ? S( i ) * 3 : 2e3;
            x.fillRect( i ? 400 + i * S( F ) : 0, i ? 150 + 0.1 * ( 2 * i * C( F ) + 2e4 / i ) : 0, K, K );
            x.fillStyle = R( 99 * i, 2 * i, i, i ? 1 : 0.4 );
        }
    }, 800, 300 ),
    7979: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/7979
        for ( let i = -9; ++i < 9; ) {
            let j;
            function R( a ) {
                const z = j - t % 1;
                x.lineTo( 150 + a * 99 / z, z + 90 + ( 99 + T( j + t & a + 9 | 8 ) + a * a ) / z );
            }
            for ( j = 12; x.beginPath( x.stroke() ), R( i ), --j; R( i + 1 ) ) {
                R( i );
            }
        }
    }, 300 ),
    20584: () => dweet( ( t, x ) => { // FROM: https://www.dwitter.net/d/20584
        const R = 48;
        for ( let i = 8064; i--; ) {
            const S = i % 97 - R;
            const T = i / 97 - R;
            const r = ( S * S + T * T ) ** 0.5;
            function z( n ) {
                return n-- && C( T / 2 + S * T / R + t * 9 ) * C( T / 4 - z( n ) * 2 ) - r / 6;
            }
            x.fillRect( S + 96, T + 54, C( Math.atan2( S, T, r ) * 9 ) * 20 - r & 44 && r > 36 ? r < 42 ? T / R : S / R : 1, r > 36 ? r < R : z( 3 ) / 5 );
        }
    }, 198, 100 )
};
