/* jshint esversion: 6 */
/* eslint-disable class-methods-use-this */

import Tag from '../model/tag';
import TagService from '../db/tagService';

class TagController {

  // GET the list of tags
  getTags(req, res) {
    console.log('GET Tags');

    // Find all tags
    TagService.findAll(function (tags) {
      return res.status(200).send({
        success: 'true',
        message: 'Tous les tags ont été récupérés',
        tags: tags
      });
    });
  }

  // GET a specific tag
  getTag(req, res) {
    console.log('GET tag');
    const id = parseInt(req.params.id, 10);

    // Find tag by id
    TagService.findById(id, function (tag) {
      if (tag != null) {
        return res.status(200).send({
          success: 'true',
          message: 'Le tag a été trouvé',
          tag: tag
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'Le tag n\'existe pas',
        });
      }
    });
  }

  // CREATE a tag
  createTag(req, res) {
    console.log('CREATE tag');

    let title = req.body.title;

    // Checks if title param is given
    if (!title) {
      return res.status(400).send({
        success: 'false',
        message: 'Le titre est requis',
      });
    }

    console.log("PAS OK");
    title = title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
    console.log("OK");
    // Create a new Tag
    const tag = new Tag(title);

    // Add tag
    TagService.add(tag, function (tag) {
      if (tag != null) {
        return res.status(200).send({
          success: 'true',
          message: 'Nouveau tag crée',
          tag: tag
        });
      } else {
        return res.status(400).send({
          success: 'false',
          message: 'Un tag avec le même titre existe déjà',
        });
      }
    });
  }

  // UPDATE a specific tag
  updateTag(req, res) {
    console.log('UPDATE tag');
    const id = parseInt(req.params.id, 10);

    // Find tag by id
    TagService.findById(id, function (tag) {
      if (tag == null) {
        return res.status(200).send({
          success: 'false',
          message: 'Le tag n\'existe pas'
        });
      }

      let title = req.body.title;

      // Get new or old values
      if (req.body.title === undefined) {
        title = tag.title;
      }

      // Update Tag attributes
      tag.title = title;

      // Update tag
      TagService.update(id, tag, function (tag) {
        return res.status(201).send({
          success: 'true',
          message: 'Le tag a été mise à jour',
          tag: tag,
        });
      });
    });
  }

  // DELETE a specific tag
  deleteTag(req, res) {
    console.log('DELETE tag');
    const id = parseInt(req.params.id, 10);

    // Delete tag
    TagService.delete(id, function (isDeleted) {
      if (isDeleted === 1) {
        return res.status(200).send({
          success: 'true',
          message: 'Le tag a été supprimé',
        });
      } else {
        return res.status(404).send({
          success: 'false',
          message: 'Le tag n\'existe pas',
        });
      }
    });
  }
}

const tagController = new TagController();
export default tagController;