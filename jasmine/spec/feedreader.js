/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {

    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has URL', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        it('has name', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    describe('The menu', function() {

        it('is hidden', function() {
            var hasMenusHiddenClass = $('body').hasClass('menu-hidden');
            expect(hasMenusHiddenClass).toBeTruthy();
        });

        //simulates clicking on the menu icon
        function onMenuClick () {
            $(".menu-icon-link").trigger("click");
        }

        it('will hide/unhide on menu icon click', function() {
            //click to unhide
            onMenuClick();
            var hasMenuHiddenClassAfterClick = $('body').hasClass('menu-hidden'); //must keep redefining this as the toggle is used, lesson learned...
            expect(hasMenuHiddenClassAfterClick).toBeFalsy();

            //click to hide
            onMenuClick();
            var hasMenuHiddenClassAfterSecondClick = $('body').hasClass('menu-hidden'); //must keep redefining this as the toggle is used, lesson learned...
            expect(hasMenuHiddenClassAfterSecondClick).toBeTruthy();

        });
    });

    describe('Initial Entries', function(){


        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should not be empty', function() {
            var feedEntryLength = $('.feed').find('.entry').length;
            expect(feedEntryLength).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have different content', function(done){
            var initialFeedText = $('.feed').text();
            var newFeedText;
            loadFeed(1, function(){  //changes feed content
                newFeedText = $('.feed').text();
                expect(newFeedText).not.toBe(initialFeedText);
                done();
            });
        });
    });

}());
