const express = require('express');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');
const mutler = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const app = express();
const PORT = process.env.PORT || 3001;

const typeDefs = gql`
    type Recipe {
        title: String
        description: String
    }
    type Query {
        recipes: [Recipe]
    }
`;

const resolvers = {
    Query: {
        recipes: () => {
            return [
                {
                    title: 'First recipe',
                    description: 'This is the first recipe'
                },
                {
                    title: 'Second recipe',
                    description: 'This is the second recipe'
                }
            ];
        }
    }
};


cloudinary.config({
    cloud_name: '',
    api_key: '',
    api_secret: ''
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'my-react-app',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => 'computed-filename-using-request',
    },
});

const server = new ApolloServer({ typeDefs, resolvers });

const upload = mutler({ storage: storage });

server.applyMiddleware({ app, path: '/graphql'  });

app.use(express.static(path.join(__dirname, 'my-react-app/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'my-react-app/build/index.html'));
});

app.post('/upload', upload.single('image'), (req, res) => {
    const { secure_url, public_id } = req.file;
    res.json({ secure_url, public_id });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});