const mongoose = require( 'mongoose' );

mongoose.connect( 'mongodb://127.0.0.1/playground1' )
    .then( () => console.log( 'Connection made successfully ...' ) )
    .catch( err => console.log( 'Error occured during connention to database ...', err ) );

//lets have our schema ,schema defines how our collection would look like
const courseSchema = new mongoose.Schema( {
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
} );
//we can now have our modal
const Course = mongoose.model( 'courses', courseSchema );

async function createCourse() {
    const course = new Course( {
        name: "React",
        author: "Scrimba",
        tags: ['reactjs', 'frontend'],
        isPublished:true
    } )
    const res = await course.save();
console.log(res)
}
async function getCourses() {
    const courses = await Course.find();
    console.log( courses );
}
getCourses()
