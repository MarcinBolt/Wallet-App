import passport from 'passport';

export const authentication = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        if (
            !user || error || req.headers.authorization.split(" ")[1] !== user.token
        ) {
            res.status(401).json({
                status: 'Error',
                code: 401,
                message: 'Unauthorized',
                data: 'Unauthorized',
            });
        }
        req.user = user;
        next();
    })(req, res, next);
};