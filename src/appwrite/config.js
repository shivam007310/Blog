/* eslint-disable no-unreachable */
/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async creatPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      throw error;
    }
  }

  // Slug is the Id of the post

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePOst:: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      await this.databases.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite service :: getPOst:: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionId,
        queries // could have been written in this way also  [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Appwrite service :: getPOsts:: error", error);
      return false;
    }
  }

  //file upload service

  async uploadFile(file) {
    try {
      // here return will be an ID that can be used to delete that file if needed in future
      return await this.bucket.createFile(
        conf.appWriteBucketId,
        ID.unique,
        file
      );
    } catch (error) {
      console.log("uploadFile :: error", error);
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appWriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview(conf.appWriteBucketId, fileId); //returns a url...can directly use inside a image tag
  }
}

const service = new Service();
export default service;
