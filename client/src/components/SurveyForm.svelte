<script>
</script>

<div class="survey-form">
  <h2>Survey Form</h2>
  <form>

    <label for="goal">Goal:</label>
    <input type="text" id="goal" name="goal" required />

    <label for="age">Age:</label>
    <input type="number" id="age" name="age" required />

    <label for="availableTimePerWeek">Available Time Per Week:</label>
    <input
      type="number"
      id="availableTimePerWeek"
      name="availableTimePerWeek"
      required
    />

    <label for="FitnessLevel">Fitness Level:</label>
    <select for="FitnessLevel"
      >fitness Level:
      <option value="beginner">beginner</option>
      <option value="intermediate">intermediate</option>
      <option value="advanced">advanced</option>
    </select>

    <label for="experienceLevel">Experience Level:</label>
    <select for="experienceLevel"
      >experience Level:
      <option value="beginner">beginner</option>
      <option value="intermediate">intermediate</option>
      <option value="advanced">advanced</option>
    </select>

    <label for="equipmentAccess">Equipment Access:</label>
    <select for="equipmentAccess"
      >equipment Access:
      <option value="home">home</option>
      <option value="gym">gym</option>
      <option value="minimal">minimal</option>
    </select>

    <label for="dietaryRestrictions">Dietary Restrictions:</label>
    <input
      type="text"
      id="dietaryRestrictions"
      name="dietaryRestrictions"
      required
    />

    <label for="healthConditions">Health Conditions:</label>
    <input type="text" id="healthConditions" name="healthConditions" required />

    <button type="submit">Submit</button>
  </form>
</div>

<style>
  @import "../css/survey.css";
</style>
