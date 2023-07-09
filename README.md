# Installation 

## BackEnd

*   ``cd server``
*   ``npm install``
*   ``npm run dev``

## FrontEnd

*   ``cd client``
*   ``npm install``
*   ``npm run dev``

# Run

*   ``Open : http://127.0.0.1:5173/  on your browser``

## 	Description of main architecture and design decisions

* This is a simple demo of a document library intended to give its users a web 
  based solution to store and share their documents with others.

* The system has been designed with a micro-service architecture in mind should 
  a user want to extend it functionalities.

* We have made use of ``React, Typescript and material ui`` for the frontend
* And ``NodeJS, Typescript`` backend.
* For simplicity , we have decided to use ``json-server`` for storing document details 
  But this store could be changed to a database of choice.
* For storing the document itself, we have decided to use a file system storage(i.e. keeping the files in a folder)
  against storing them as blob in a database as this method has been experimented to perform better 
  see: ``https://github.com/jasogwa/FileVsDb`` for the comparison. 

### Things Not implemented yet.

* Thing intended for the demo but not completed is the ``preview image of content 1st page content`` 
  for documents that are not images (e.g. pdf, docx). This is because the process of conversion needs more 
  time, and therefore should be left for the main implementation. 

* Other things like restricting users access was not also implemented in this demo.

* I have also decided to set 1hour expiration period for the generated document links since there is not restriction to 
  the system and therefore provision was not made for a user to select the length of time for that.

### Improvement Ideas

* The idea on how to improve the system can be discussed during the review. 
