HackathonShop
=============


# URL Requests with a response

* /keywords
* /products?loc=95014
* /fav
** Sample Response (update to give img, name, url instead)
[{"product":{"id":"bc794b5c-07a7-4716-94cf-57fb9a65e6a7","externalproductid": ...
* /ajax

# URL Requests without a response

* /remove?key=key1,key2,key3
* /add?key=key1,key2,key3
* /change?loc=95014

# Stuff I give you

* /like?image='image'&name='productName'&buyUrl='url'
* /dislike?image='image'&name='productName'&buyUrl='url'

#Instructions for local gitignore:
1) enter test.js under .git/info/exclude
2) run git update-index --assume-unchanged test.js
