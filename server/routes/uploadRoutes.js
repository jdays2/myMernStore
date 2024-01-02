import express from 'express';
import path from 'path';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, 'upload/'); //null for error
	},
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
		);
	},
});

const fileFilter = (file, cb) => {
	const filetypes = /jpg|jpeg|png|webp/;
	const extname = filetypes.test(path.extname(file.originalname)).toLowerCase();

	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		return cb('Images only!', false);
	}
};

const upload = multer({
	storage,
  fileFilter
});

router.post('/', upload.single('image'), (req, res) => {
	console.log(req.body)
	res.send({
		message: 'Image Uploaded',
		image: `${req.file.path}`,
	});
});

export default router;
