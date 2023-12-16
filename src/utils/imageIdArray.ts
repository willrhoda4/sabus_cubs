






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
                           ];
      
    const randomizedIds = shuffleArray(ids);
  

    // Slice the first 'amount' of elements after shuffling
    return randomizedIds.slice( 0, amount );
}