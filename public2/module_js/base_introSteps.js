{
  let jqhxrArray = new Array(); // this array will be handed to Promise.all
  let pathArray = window.location.pathname.split('/');
  const subdirectory1 = pathArray[1]; // idenify the current page
  const subdirectory2 = pathArray[2]; // idenify the current module
  let startTimestamp = Date.now();

  function startIntro(){
    var intro = introJs().setOptions({
      steps: stepsList,
      'hidePrev': true,
      'hideNext': true,
      'exitOnOverlayClick': false,
      'showStepNumbers':false,
      'showBullets':false,
      'scrollToElement':true,
      'doneLabel':'Done &#10003'
    });

    /*
    onbeforechange:
    "Given callback function will be called before starting a new step of
    introduction. The callback function receives the element of the new step as
    an argument."
    */
    intro.onbeforechange (function() {

      // if this function is defined in the custom js file, run it
      try {
        additionalOnBeforeChange($(this));
      } catch (error) {
        if ( !(error instanceof ReferenceError) ) {
          console.log("There has been an unexpected error:");
          console.log(error);
        }
      }

      // ._currentStep has the number of the NEXT tutorial box you're moving toward.
      // However, we want to know the number of the step we are LEAVING.
      // We can use ._direction to determine if we are going forward or backward,
      // and then subtract/add accordingly to get the number we want.
      let leavingStep = 0;
      if($(this)[0]._direction === "forward") {
        leavingStep = ($(this)[0]._currentStep - 1);
      } else if ($(this)[0]._direction === "backward"){
        leavingStep = ($(this)[0]._currentStep + 1);
      } else {
        console.log(`There was an error in calculating the step number.`);
      }
      let totalTimeOpen = Date.now() - startTimestamp;
      let cat = new Object();
      cat.subdirectory1 = subdirectory1;
      cat.subdirectory2 = subdirectory2;
      cat.stepNumber = leavingStep;
      cat.viewDuration = totalTimeOpen;
      cat.absoluteStartTime = startTimestamp;
      // Check that leavingStep is a legitimate number. -1 seems to occur whenever
      // the page is loaded, or when the back button is used - we don't want to
      // record those occurrences.
      if(leavingStep !== -1){
        const jqxhr = $.post("/introjsStep", {
          action: cat,
          _csrf: $('meta[name="csrf-token"]').attr('content')
        });
        jqhxrArray.push(jqxhr);
      }
    });

    /*
    onafterchange:
    "Given callback function will be called after starting a new step of
    introduction. The callback function receives the element of the new step as
    an argument."
    */
    intro.onafterchange(function(){
      // reset the timestamp for the next step
      startTimestamp = Date.now();
    })

    /*
    onbeforexit:
    "Works exactly same as onexit but calls before closing the tour. Also,
    returning false would prevent the tour from closing."
    */
    intro.onbeforeexit(function(){
      let leavingStep = $(this)[0]._currentStep;
      // edge case: current step will = -1 when the user leaves the page using
      // something like the back button. Don not record that.
      let totalTimeOpen = Date.now() - startTimestamp;
      let cat = new Object();
      cat.subdirectory1 = subdirectory1;
      cat.subdirectory2 = subdirectory2;
      cat.stepNumber = leavingStep;
      cat.viewDuration = totalTimeOpen;
      cat.absoluteStartTime = startTimestamp;
      const jqxhr = $.post("/introjsStep", {
        action: cat,
        _csrf: $('meta[name="csrf-token"]').attr('content')
      });
      jqhxrArray.push(jqxhr);
      // this is the last step in the module, so change pages once all Promises
      // are completed
      Promise.all(jqhxrArray).then(function() {
        // use the variable nextPageURL defined in the custom js file for the page
        window.location.href = `/${nextPageURL}/${subdirectory2}`
      });
    })

    intro.start(); //start the intro
  };

  $(window).on("load", function() {
    // if this function is defined in the custom js file, run it
    try {
      customOnWindowLoad();
    } catch (error) {
      if (error instanceof ReferenceError) {
        startIntro();
      } else {
        console.log("There has been an unexpected error:");
        console.log(error);
      }
    }
  });
}
