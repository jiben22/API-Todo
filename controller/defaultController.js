/* jshint esversion: 6 */
/* eslint-disable class-methods-use-this */

class DefaultController {

  // Default response
  default(req, res) {
    console.log('Default');

    return res.status(404).send({
      success: 'false',
      message: 'Cette URI n`existe pas',
    });
  }
}

const defaultController = new DefaultController();
export default defaultController;