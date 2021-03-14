# Back-end

# Troubleshooting

Q: Warning: Accessing non-existent property 'MongoError' of module exports inside circular dependency
A: Commenting out the following line inside node_modules/mongodb/lib/operations/operation.js helped me solving the problem. `const MongoError = require('../core').MongoError;`
