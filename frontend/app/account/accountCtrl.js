app.controller('accountPageController',['ideaService', '$scope', function(ideaService, $scope){

    $scope.createdIdea = [];
    $scope.purchasedIdea = [];

    ideaService.loadIdeas().then(function(response){
        $scope.ideas = response.data;
        console.log($scope.ideas);


        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;

        $scope.slides = $scope.ideas.map(function (idea, i) {

            return {
                title: idea.title,
                text: idea.description,
                id: currIndex++
            }
        });
        console.log("slides", $scope.slides);
        initIdeas()
    });

    function initIdeas() {
        var counter = 0,
            color = ['#e87f7b','#f2e99c','#49484d','#f6f0e0','#e7d2a7','#abd87d','#dbecbf','#f5c4d7','#78ccee','#b9e5f0','#fb9a55','#c9c3e9'],
            stampUrl = ['',
                'http://www.postoffice.co.uk/dam/jcr:f88b3c53-0149-4789-82bc-a42a09111210/IMG_christmas_2016_good_to_know.png',
                'http://www.clipartkid.com/images/714/this-is-a-vintage-digital-stamp-i-created-from-a-vintage-postcard-back-SbunAy-clipart.png',
                'http://www.markoshea.info/images/papua2pix/rubber_stamp.png',
                'http://www.markoshea.info/images/shopix/monitor_stamp.png'],
            stampUrlIndex = 0,
            markUrl = ['https://img0.etsystatic.com/110/0/11208571/il_570xN.1062279858_bnn8.jpg',
                'http://www.philatelicdatabase.com/wp-content/uploads/2008/03/german-new-guinea-1m.png',
                'http://3.bp.blogspot.com/-71StoaEBI0E/Tum0RIgvEVI/AAAAAAAAMqI/lHFaPhD2htY/s1600/freshroasted-Zazzle-abominable-snowman-postage-stamp.png/',
                'http://www.20stamps.com/assets/img/homepage/custom-postage-holiday.png',
                'http://mheadesign.com/wp-content/uploads/2013/01/Infinity-symbol-with-red-love-hearts-personalized-Save-the-Date-postage-stamp.png'],
            colorIndex = 0;

        var ideaStyles = $scope.ideas.map(function (i,secret) {
            colorIndex = Math.round(getRandomArbitrary(0,color.length-1));
            stampUrlIndex = Math.round(getRandomArbitrary(0,stampUrl.length-1));

            return {
                index: counter++,
                styles: { 'background': color[colorIndex]},
                mark: {
                    'background':  'url("'+markUrl[stampUrlIndex]+'")',
                    'background-size': 'cover',
                    'background-position': 'center'
                },
                stamp: {
                    'z-index': 2 + counter,
                    'transform': 'rotate('+((counter % 2 === 0 ? getRandomArbitrary(0,70) : getRandomArbitrary(-70,0))) + 'deg)',
                    'background':  'url("'+stampUrl[stampUrlIndex]+'")',
                    'background-size': 'cover',
                    'background-position': 'center'
                }
            };
        });
    }



    $scope.randomize = function() {
        var indexes = generateIndexesArray();
        assignNewIndexesToSlides(indexes);
    };

    // Randomize logic below

    function assignNewIndexesToSlides(indexes) {
        for (var i = 0, l = slides.length; i < l; i++) {
            slides[i].id = indexes.pop();
        }
    }

    function generateIndexesArray() {
        var indexes = [];
        for (var i = 0; i < currIndex; ++i) {
            indexes[i] = i;
        }
        return shuffle(indexes);
    }

    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
        var tmp, current, top = array.length;

        if (top) {
            while (--top) {
                current = Math.floor(Math.random() * (top + 1));
                tmp = array[current];
                array[current] = array[top];
                array[top] = tmp;
            }
        }

         return array;
    }
}]);