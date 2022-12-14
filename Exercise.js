const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://127.0.0.1/exercise' )
    .then( () => console.log( 'Connection Made successfuly' ) )
    .catch( err => console.log( 'Err Connecting to Database' ) )

const languageSchema = new mongoose.Schema( {
    name: String,
    tag: [String],
    date: {  type: Date, default: Date.now },
    auther: String,
    isPublished: Boolean,
    price: Number
} );
const Languages = new mongoose.model( 'Languages', languageSchema );
async function addNewLanguage() {
    const coursesToAdd = [
        { name: "Html",
        tag: ['Html', 'Frontend'],
        auther: "TELUSKO",
        isPublished: true,
        price: 130
        },
        { name: "Css",
        tag: ['Css', 'Frontend'],
        auther: "TELUSKO",
        isPublished: true,
        price: 130

        },
        { name: "Javascript",
        tag: ['Js', 'Frontend'],
        auther: "Tutorial.net",
        isPublished: false,
            price: 430
        },
        { name: "Bootstrap",
        tag: ['Bootstrap', 'Frontend'],
        auther: "W3 Schools",
        isPublished: false,
            price: 1730
        },
        { name: "Python",
        tag: ['Python', 'Backend'],
        auther: "W3 Schools",
        isPublished: false,
        price: 1030},
    ]
    const length = coursesToAdd.length;
    let res;
    for ( i = 0; i < length; i++ ){
        const language = new Languages( coursesToAdd[i] );
         res = await language.save();
    }
    console.log(res);
}
async function findPublishedBackends() {
    const res = await Languages.find(  )
        .and( [{ isPublished: true }, { tag: 'Frontend' }] )
        .sort( { name: 1 } )
        .select( { name: 1, auther: 1 } )
    
       
    console.log( res );
}
async function getBackendFrontend() {
    const languageFound = await Languages.find()
        .or( [{ tag: "Backend" }, { tag: "Frontend" }] )
        .sort( { price: -1 } )
        .select( { name: 1, auther: 1 } )
        console.log( languageFound );
}
async function updateCourse(id){
    const language = await Languages.findById( id );
    language.set( { auther: "Another Auther", price: 9020 } )
    const res = await language.save();
    console.log( res );
}
async function deleteLanguage(id) {
    const deletedResult = await Languages.findByIdAndRemove( id );
    console.log( deletedResult );
}
function run() {
   // console.log( addNewLanguage() );
    //console.log( findPublishedBackends() );
   // console.log( getBackendFrontend() );
   // console.log( updateCourse( '6374fcd82459c0538dfbb82d' ) );
    console.log( deleteLanguage( '6374ff803f673d9d05eb75b5' ) );
}
run();