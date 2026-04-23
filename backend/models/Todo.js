const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true 
        
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;