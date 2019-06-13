var mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        description: "Donec ac libero eleifend, facilisis enim sed, maximus urna. Maecenas tristique eu dui et gravida. Aenean nunc enim, efficitur vitae odio et, efficitur posuere diam. Phasellus non tristique neque. Etiam id justo tellus. Nullam ultrices ipsum at justo bibendum, sit amet pulvinar urna feugiat. Vestibulum cursus pretium mauris, sed consequat ipsum mattis ut. Nunc molestie dui sed est maximus porttitor. Nam sit amet justo pharetra, eleifend dui eget, semper nibh. Duis vel mattis libero, non faucibus nulla. Maecenas ante elit, venenatis suscipit leo vel, efficitur malesuada elit. Morbi lobortis sapien in faucibus blandit. Vivamus consectetur commodo mi vitae lobortis. Nam viverra mi mi, id consequat nunc interdum nec. Suspendisse sed ex sed massa ornare porta vel id arcu. Vivamus eleifend dolor efficitur suscipit tincidunt. Fusce mollis turpis sed lectus malesuada, ut volutpat eros congue. Suspendisse at nulla suscipit, vulputate metus vitae, lobortis est. Aliquam viverra eu nisl id placerat. Aenean nec sagittis enim. Etiam et vehicula elit. Nam ultricies ullamcorper nulla, at congue dui blandit consequat. Morbi quam arcu, ornare vel laoreet nec, lacinia sed augue. Nunc sed cursus purus."
        
    },
    {
        name: "Desert Mesa",
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        description: "Donec ac libero eleifend, facilisis enim sed, maximus urna. Maecenas tristique eu dui et gravida. Aenean nunc enim, efficitur vitae odio et, efficitur posuere diam. Phasellus non tristique neque. Etiam id justo tellus. Nullam ultrices ipsum at justo bibendum, sit amet pulvinar urna feugiat. Vestibulum cursus pretium mauris, sed consequat ipsum mattis ut. Nunc molestie dui sed est maximus porttitor. Nam sit amet justo pharetra, eleifend dui eget, semper nibh. Duis vel mattis libero, non faucibus nulla. Maecenas ante elit, venenatis suscipit leo vel, efficitur malesuada elit. Morbi lobortis sapien in faucibus blandit. Vivamus consectetur commodo mi vitae lobortis. Nam viverra mi mi, id consequat nunc interdum nec. Suspendisse sed ex sed massa ornare porta vel id arcu. Vivamus eleifend dolor efficitur suscipit tincidunt. Fusce mollis turpis sed lectus malesuada, ut volutpat eros congue. Suspendisse at nulla suscipit, vulputate metus vitae, lobortis est. Aliquam viverra eu nisl id placerat. Aenean nec sagittis enim. Etiam et vehicula elit. Nam ultricies ullamcorper nulla, at congue dui blandit consequat. Morbi quam arcu, ornare vel laoreet nec, lacinia sed augue. Nunc sed cursus purus."
    },
    {
        name: "Canyon Floor",
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Donec ac libero eleifend, facilisis enim sed, maximus urna. Maecenas tristique eu dui et gravida. Aenean nunc enim, efficitur vitae odio et, efficitur posuere diam. Phasellus non tristique neque. Etiam id justo tellus. Nullam ultrices ipsum at justo bibendum, sit amet pulvinar urna feugiat. Vestibulum cursus pretium mauris, sed consequat ipsum mattis ut. Nunc molestie dui sed est maximus porttitor. Nam sit amet justo pharetra, eleifend dui eget, semper nibh. Duis vel mattis libero, non faucibus nulla. Maecenas ante elit, venenatis suscipit leo vel, efficitur malesuada elit. Morbi lobortis sapien in faucibus blandit. Vivamus consectetur commodo mi vitae lobortis. Nam viverra mi mi, id consequat nunc interdum nec. Suspendisse sed ex sed massa ornare porta vel id arcu. Vivamus eleifend dolor efficitur suscipit tincidunt. Fusce mollis turpis sed lectus malesuada, ut volutpat eros congue. Suspendisse at nulla suscipit, vulputate metus vitae, lobortis est. Aliquam viverra eu nisl id placerat. Aenean nec sagittis enim. Etiam et vehicula elit. Nam ultricies ullamcorper nulla, at congue dui blandit consequat. Morbi quam arcu, ornare vel laoreet nec, lacinia sed augue. Nunc sed cursus purus."
    }
];

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed campgrounds!");
        }
        // Add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
              if(err){
                  console.log(err);
              } else {
                  console.log("added a campground!");
                    // Create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet!",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a new comment!");
                            }
                        }
                    );
              }
            });
        });
    });
}

module.exports = seedDB;