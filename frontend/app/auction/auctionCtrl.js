app.controller('auctionPageController', ['$scope', 'ideaService', '$stateParams', 'userService', function($scope, ideaService, $stateParams, userService){

    $scope.bet = "";
    $scope.timer = {
        value: 100
    };
    $scope.ideaId = $stateParams.ideaId;
    $scope.currentUser = userService.watchCurrentUser();
    $scope.$watch(userService.watchCurrentUser, function(n){
        $scope.currentUSer = n;
    });
    $scope.paymentIsActive = false;

    var socket;
    var MIN_BID_STEP = 0.25;

    var BET_TIME = 60 * 1000;
    var TIMER_STEP = 10;
    
    function calculateNextMinBid(bids){
        var amounts = bids.map(function(item){
            return item.amount;
        });
        return bids ? Math.max.apply(null, amounts) + MIN_BID_STEP : MIN_BID_STEP;
    }
    function checkIsLastUser(bids){
        return bids.length > 0 && bids[0].userId == $scope.currentUser.id;
    }
    function calculateBetTime(bid){
        var time = BET_TIME - (Date.now() - bid.timeStamp);
        if (time < 0) {
            time = 0;
        } else  if( time > BET_TIME){
            time = BET_TIME;
        }

        return time;
    }

    ideaService.getIdeaById($scope.ideaId).then(
        function(response){
            $scope.idea = response.data;
            $scope.isLastUser = checkIsLastUser($scope.idea.bids);
            $scope.bet = calculateNextMinBid($scope.idea.bids);

            $scope.currentTime = calculateBetTime($scope.idea.bids[0]);

            startTimer();

            socket = io.connect(window.location.protocol+ "//" + window.location.hostname + ':1338');

            socket.on('connect', function () {
                $scope.makeBid = function () {
                    var bid = {
                        ideaId: $scope.ideaId,
                        userId: $scope.currentUser.id,
                        username: $scope.currentUser.username,

                        timeStamp: Date.now(),
                        amount: $scope.bet
                    };

                    $scope.idea.bids.unshift(bid);
                    $scope.isLastUser = checkIsLastUser($scope.idea.bids);
                    $scope.bet = calculateNextMinBid($scope.idea.bids);
                    $scope.currentTime = BET_TIME;
                    socket.emit('bid', bid);
                };
            });

            socket.on('bid-' + $scope.ideaId, function (data) {
                console.log('bid-' + $scope.ideaId, data);

                var minBid = calculateNextMinBid(data);

                $scope.$apply(function(){
                    $scope.idea.bids = data;
                    $scope.isLastUser = checkIsLastUser(data);
                    $scope.currentTime = BET_TIME;
                    if ($scope.bet < minBid) {
                        $scope.bet = minBid;
                    }
                });
            });

            socket.on('finish-' + $scope.ideaId, function (data){
                console.log("finish", data);

            });

            socket.on('close-' + $scope.ideaId, function (data){

            });

        },
        function(error){
            console.log("error", error);
        }
    );

    $scope.randomIdeas = [];

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    function initCells(){

        var counter = 0,
            color = ['#e87f7b','#f2e99c','#49484d','#f6f0e0','#e7d2a7','#abd87d','#dbecbf','#f5c4d7','#78ccee','#b9e5f0','#fb9a55','#c9c3e9'],
            stampUrl = ['',
                'http://www.postoffice.co.uk/dam/jcr:f88b3c53-0149-4789-82bc-a42a09111210/IMG_christmas_2016_good_to_know.png',
                'http://www.clipartkid.com/images/714/this-is-a-vintage-digital-stamp-i-created-from-a-vintage-postcard-back-SbunAy-clipart.png',
                'http://www.markoshea.info/images/papua2pix/rubber_stamp.png',
                'http://www.markoshea.info/images/shopix/monitor_stamp.png'],
            stampUrlIndex = 0,
            colorIndex = 0;

            colorIndex = Math.round(getRandomArbitrary(0,color.length));
            stampUrlIndex = Math.round(getRandomArbitrary(0,stampUrl.length));
            $scope.randomIdeas = {
                index: counter++,
                styles: {
                    'background':  color[colorIndex]
                },
                stamp: {
                    'z-index': 2 + counter,
                    'transform': 'rotate('+((counter % 2 === 0 ? getRandomArbitrary(0,70) : getRandomArbitrary(-70,0))) + 'deg)',
                    'background':  'url("'+stampUrl[stampUrlIndex]+'")',
                    'background-size': 'cover',
                    'background-position': 'center'
                }
            };
    }
    initCells();

    $scope.go = function(id){
        $state.go("auction", {ideaId: id});
    };

    function startTimer () {
        calcValues();
        setInterval(function () {
            $scope.$apply(function () {
                calcValues()
            });
        }, TIMER_STEP)
    }
    var calcValues = function() {
        if ($scope.currentTime >= TIMER_STEP) {
            $scope.currentTime -= TIMER_STEP;
        } else {
            $scope.currentTime = 0;
        }
        $scope.timer.value = $scope.currentTime / BET_TIME * 100;
    };

    $scope.submitPayment = function($event) {
        $event.preventDefault();
        var $form = $("#payment-form");
        Stripe.card.createToken($form, stripeResponseHandler);

        return false;
    };

    function stripeResponseHandler(status, response) {
        // Grab the form:
        var $form = $('#payment-form');

        if (response.error) { // Problem!

            // Show the errors on the form:
            $form.find('.payment-errors').text(response.error.message);
            $form.find('.submit').prop('disabled', false); // Re-enable submission

        } else { // Token was created!

            // Get the token ID:
            var token = response.id;

            // Insert the token ID into the form so it gets submitted to the server:
            $form.append($('<input type="hidden" name="stripeToken">').val(token));

            // Submit the form:
            $form.get(0).submit();
        }
    }

}]);