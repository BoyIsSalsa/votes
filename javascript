// Assuming fetch is available
const vote = async (option) => {
  try {
    const response = await fetch('https://api.github.com/repos/BoyIsSalsa/DilanCastro-votes/contents/votes.json', {
      method: 'GET',
      headers: {
        'Authorization': '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', // Replace with your token
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    const data = await response.json();
    const votes = JSON.parse(atob(data.content));

    votes[option] = votes[option] ? votes[option] + 1 : 1;

    await fetch('https://api.github.com/repos/BoyIsSalsa/DilanCastro-votes/contents/votes.json', {
      method: 'PUT',
      headers: {
        'Authorization': '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',
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: 'Update votes',
        content: btoa(JSON.stringify(votes)),
        sha: data.sha
      })
    });

    alert(`You voted for ${option}!`);
  } catch (error) {
    console.error('Error:', error);
    alert('Error occurred while voting');
  }
};
