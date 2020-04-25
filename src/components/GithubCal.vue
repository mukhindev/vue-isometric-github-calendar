<template lang="pug">
  transition(name="transition-fade")
    .github(v-if="github.calendar")
      .github-stats
        .container
          h2 GitНub активность
          .grid
            .col.col-4.col-sm-12(class="text-center")
              .card
                .github-stats__score {{ totalContributions }}
                span вкладов в году
            .col.col-4.col-sm-12(class="text-center")
              .card
                .github-stats__score {{ lastWeek }}
                span прошлая неделя
            .col.col-4.col-sm-12(class="text-center")
              .card
                .github-stats__score {{ thisWeek }}
                span эта неделя
      .github-calendar(class="text-center")
        svg.github-calendar__svg(
          :viewBox="`-320 -120 ${1980} ${1155}`"
          xmlns="http://www.w3.org/2000/svg"
        )
          g.github-calendar__week(
            v-for="(week, weekIndex) in weeks"
            :key="weekIndex"
          )
            github-day(
              v-for="(day, dayIndex) in week.contributionDays"
              :key="dayIndex"
              :position="{x: dayIndex, y: weekIndex}"
              :color="day.color"
              :contributionCount="day.contributionCount"
            )
        a.github-calendar__source(
          href="https://github.com/mukhindev"
          target="_blank"
        ) По данным GitHub API v4
</template>

<script>
import axios from 'axios'
import githubGQL from '../github.graphql'
import GithubDay from './GithubDay.vue'

const query = githubGQL.replace(/__login__/, process.env.githubLogin)

export default {
  name: 'Github',
  components: {
    GithubDay
  },
  data () {
    return {
      github: {
        calendar: null
      }
    }
  },
  computed: {
    totalContributions() {
      return this.github.calendar.totalContributions
    },
    weeks() {
      if (this.github.calendar.weeks) return this.github.calendar.weeks
      else return []
    },
    lastWeek() {
      if (!this.weeks) return null
      else {
        const lastWeek = this.weeks[this.weeks.length - 2]
        if (lastWeek.contributionDays.length === 1) {
          return lastWeek.contributionDays[0].contributionCount
        }
        if (lastWeek.contributionDays.length > 1) {
          const contributions = lastWeek.contributionDays.map(el => el.contributionCount)
          return contributions.reduce((a, b) => a + b)
        }
      }
    },
    thisWeek() {
      if (!this.weeks) return null
      else {
        const thisWeek = this.weeks[this.weeks.length - 1]
        if (thisWeek.contributionDays.length === 1) {
          return thisWeek.contributionDays[0].contributionCount
        }
        if (thisWeek.contributionDays.length > 1) {
          const contributions = thisWeek.contributionDays.map(el => el.contributionCount)
          return contributions.reduce((a, b) => a + b)
        }
      }
    }
  },
  async mounted () {
    const config = {
      headers: { Authorization: `Bearer ${process.env.githubToken}` }
    }
    const { data } = await axios.post(`${process.env.githubGraphQL}`, { query }, config)
    this.github.calendar = data.data.user.contributionsCollection.contributionCalendar
  }
}
</script>

<style>
  .github-stats__score {
    color: #008A25;
    font-size: 3rem;
  }

  .github-calendar {
    background-color: #008A25;
    padding: 2rem 0;
  }

  .github-calendar__svg {
    width: 100%;
  }

  .github-calendar__source {
    color: #FFF;
    text-align: center;
  }

  .github-calendar__source-link {
    color: #FFF;
  }

  .transition-fade-enter-active, .transition-fade-leave-active {
    transition: opacity 1s;
  }

  .transition-fade-enter, .transition-fade-leave-to {
    opacity: 0;
  }

</style>
