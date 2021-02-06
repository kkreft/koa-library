const Router = require('koa-router');
const router = new Router();
const {
    BookController,
    AccountController,
    ReaderController,
    BorrowController
} = require('../controllers');
const isAuthenticated = require('../polices/isAuthenticated');

// Book routes
router.post('/book', isAuthenticated, BookController.create);
router.get('/book', isAuthenticated, BookController.find);
router.get('/book/:id', isAuthenticated, BookController.findOne);
router.delete('/book/:id', isAuthenticated, BookController.delete);
router.put('/book/:id', isAuthenticated, BookController.update);

// Reader routes
router.post('/reader', isAuthenticated, ReaderController.create);
router.get('/reader', isAuthenticated, ReaderController.find);
router.get('/reader/:id', isAuthenticated, ReaderController.findOne);
router.delete('/reader/:id', isAuthenticated, ReaderController.delete);
router.put('/reader/:id', isAuthenticated, ReaderController.update);

// Borrowing route
router.post('/borrow', isAuthenticated, BorrowController.create);

//User routes
router.post('/signup', AccountController.signup);
router.post('/login', AccountController.login);

module.exports = router;
