import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';
import util from 'util';

// Make `formidable` work with Next.js API routes
export const config = {
    api: {
        bodyParser: false,
    },
};

// Promisify the form.parse function for easier async/await handling
const parseForm = util.promisify(new IncomingForm().parse.bind(new IncomingForm()));

export default async function handler(req, res) {
    try {
        // Parse the form data
        const { files } = await parseForm(req);

        // Check if file is uploaded
        if (!files.file) {
            return res.status(400).json({ error: 'No file uploaded.' });
        }

        const file = files.file[0]; // file is an array, get the first file
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure upload directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Move the file to the upload directory
        const newFilePath = path.join(uploadDir, file.originalFilename);
        fs.renameSync(file.filepath, newFilePath);

        // Respond with the uploaded file name
        res.status(200).json({ fileName: file.originalFilename });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
