






import shuffleArray from "./shuffleArray";








export default function imageIdArray( amount : number ) : string[] {

    const ids : string[] = [ 
                              'jumpshot_right', 
                              'pulling_cart', 
                              'jumpshot_left',
                              'maintaining_smudge', 
                              'face_squeeze', 
                              'heres_a_sandwich',
                              'peace_signs', 
                              'teeter_totter', 
                              'the_boys', 
                              'sandwich_pass', 
                              'double_dunk', 
                              'past_house', 
                              'loading_cart', 
                              'preparing_smudge', 
                              'ready_to_walk', 
                              'for_three',
                              'cart_in_dark',
                              'panda_sign',
                              'trash_grab',
                              'dinners_served',
                              'rollerblading',
                              'every_child_matters',
                              'soup_stack',
                              'crosswalk',
                              'sidewalk_procession',
                              'prewalk_prayer',
                              'over_fence',
                              'walkie_talkie_left',
                              'walkie_talkie_right',
                              'pass_up_stairs',
                              'thumbs_up',
                              'in_the_streets',

                           ];
      
    const randomizedIds = shuffleArray(ids);
  

    // Slice the first 'amount' of elements after shuffling
    return randomizedIds.slice( 0, amount );
}