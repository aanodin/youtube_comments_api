
// Main
function main()
{
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // videos list sheet
  var vlSheet = ss.getSheetByName("Video List");
  var values = vlSheet.getDataRange().getValues(); 
  
  for (var i = 0; i < values.length; ++i) {
    // get video id from list sheet
    var videoId = values[i][0];
    // load comments via YouTube Data API
    var comments = loadComments(videoId);
    // create new sheet to store comments
    var commentsSheet = createCommentSheet(ss, i + 1);
    // save comments in new sheet
    outputToSpreadsheet(comments, commentsSheet);
  }  
}

// Loads top-level comments for specified YouTube video_id
function loadComments(video_id) {

  var options = {videoId: video_id, maxResults: 100}
  return YouTube.CommentThreads.list("snippet", options );
}

// Outputs comments' author and text and to specified sheet
function outputToSpreadsheet(comments, sheet) {
  
  var items = comments["items"];
  
  for (var i = 0; i < items.length; ++i) {
    var snippet = items[i]["snippet"]["topLevelComment"]["snippet"]
    var text = snippet["textDisplay"]
    var author = snippet["authorDisplayName"]

    sheet.appendRow([author, text])
  }
}

// Creates new sheet to store comments
// ss is a SpreadSheet
// num is a natural number for name building
function createCommentSheet(ss, num) {
  return ss.insertSheet("Comments " + num)
}
