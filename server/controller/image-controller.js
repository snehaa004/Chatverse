import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gfs, gridFsBucket;
const conn = mongoose.connection;

// Wait for the connection to be established
conn.once('open', () => {
    // Initialize GridFS
    gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'fs' });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
    console.log('MongoDB connected and GridFS initialized');
});

export const uploadFile = async (request, response) => {
    if (!request.file) {
        return response.status(404).json("File not found");
    }

    const imageUrl = `${url}/file/${request.file.filename}`;
    return response.status(200).json(imageUrl);
}

export const getImage = async (request, response) => {
    try {
        // Make sure gfs or gridFsBucket is initialized
        if (!gfs || !gridFsBucket) {
            return response.status(500).json({ msg: "GridFS not initialized. Please try again later." });
        }

        const file = await gfs.files.findOne({ filename: request.params.filename });

        if (!file) {
            return response.status(404).json({ msg: "File not found" });
        }

        const readStream = gridFsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}
