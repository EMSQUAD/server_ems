const WalkieRepository = require('../repository/walkie.repository');
const { ServerError, BadRequestError, NotFoundError } = require('../errors/error');

const walkieRepository = new WalkieRepository();

exports.walkieController = {
    async getAllWalkies(req, res) {
        try {
            const walkies = await walkieRepository.find();
            if (!walkies || walkies.length === 0) {
                throw new NotFoundError('Walkies not found');
            }
            res.status(200).json({
                status: 200,
                message: 'Walkies retrieved successfully',
                data: walkies,
            });
        } catch (error) {
            console.error(`Error: ${error.message}`);
            if (error instanceof ServerError) {
                res.status(500).json({
                    status: 500,
                    message: 'Internal Server Error',
                });
            } else {
                res.status(error.status || 500).json({
                    status: error.status || 500,
                    message: error.message,
                });
            }
        }
    },

    async createWalkie(req, res) {
        try {
            const walkie = await walkieRepository.create(req.body);
            res.status(201).json(walkie);
        } catch (error) {
            res.status(500).json(new ServerError(error));
        }
    },

    async sendMessage(req, res) {
        try {
            const walkie = await walkieRepository.sendMessage(req.body);
            res.status(201).json(walkie);
        } catch (error) {
            res.status(500).json(new ServerError(error));
        }
    },  

    async deleteWalkie(req, res) {
        try {
            const walkie = await walkieRepository.delete(req.params.id);
            if (!walkie) {
                throw new NotFoundError('Walkie not found');
            }
            res.status(200).json(walkie);
        } catch (error) {
            res.status(500).json(new ServerError(error));
        }
    }
};