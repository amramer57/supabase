// Standardization as per document: https://www.notion.so/supabase/Event-tracking-standardization-1195004b775f80f98ee3fa9e70cf4d05

export enum TelemetryActions {
  SIGN_UP = 'sign_up',
  SIGN_IN = 'sign_in',

  ASSISTANT_PROMPT_SUBMITTED = 'assistant_prompt_submitted',
  ASSISTANT_DEBUG_SUBMITTED = 'assistant_debug_submitted',
  ASSISTANT_SUGGESTION_RUN_QUERY_CLICKED = 'assistant_suggestion_run_query_clicked',
  ASSISTANT_SQL_DIFF_HANDLER_EVALUATED = 'assistant_sql_diff_handler_evaluated',
  ASSISTANT_EDIT_IN_SQL_EDITOR_CLICKED = 'assistant_edit_in_sql_editor_clicked',

  CONNECTION_STRING_COPIED = 'connection_string_copied',

  CRON_JOB_CREATED = 'cron_job_created',
  CRON_JOB_UPDATED = 'cron_job_updated',
  CRON_JOB_DELETED = 'cron_job_deleted',
  CRON_JOB_DELETE_CLICKED = 'cron_job_delete_clicked',
  CRON_JOB_UPDATE_CLICKED = 'cron_job_update_clicked',
  CRON_JOB_CREATE_CLICKED = 'cron_job_create_clicked',
  CRON_JOB_HISTORY_CLICKED = 'cron_job_history_clicked',

  FEATURE_PREVIEWS_CLICKED = 'feature_previews_clicked',
  FEATURE_PREVIEW_ENABLED = 'feature_preview_enabled',
  FEATURE_PREVIEW_DISABLED = 'feature_preview_disabled',

  PROJECT_CREATION_INITIAL_STEP_PROMPT_INTENDED = 'project_creation_initial_step_prompt_intended',
  PROJECT_CREATION_INITIAL_STEP_SUBMITTED = 'project_creation_initial_step_submitted',
  PROJECT_CREATION_SECOND_STEP_PROMPT_INTENDED = 'project_creation_second_step_prompt_intended',
  PROJECT_CREATION_SECOND_STEP_SUBMITTED = 'project_creation_second_step_submitted',

  REALTIME_INSPECTOR_LISTEN_CHANNEL_CLICKED = 'realtime_inspector_listen_channel_clicked',
  REALTIME_INSPECTOR_BROADCAST_SENT = 'realtime_inspector_broadcast_sent',
  REALTIME_INSPECTOR_MESSAGE_CLICKED = 'realtime_inspector_message_clicked',
  REALTIME_INSPECTOR_COPY_MESSAGE_CLICKED = 'realtime_inspector_copy_message_clicked',
  REALTIME_INSPECTOR_FILTERS_APPLIED = 'realtime_inspector_filters_applied',
  REALTIME_INSPECTOR_DATABASE_ROLE_UPDATED = 'realtime_inspector_database_role_updated',

  SQL_EDITOR_QUICKSTART_CLICKED = 'sql_editor_quickstart_clicked',
  SQL_EDITOR_TEMPLATE_CLICKED = 'sql_editor_template_clicked',
  SQL_EDITOR_RESULT_DOWNLOAD_CSV_CLICKED = 'sql_editor_result_download_csv_clicked',
  SQL_EDITOR_RESULT_COPY_MARKDOWN_CLICKED = 'sql_editor_result_copy_markdown_clicked',
  SQL_EDITOR_RESULT_COPY_JSON_CLICKED = 'sql_editor_result_copy_markdown_clicked',

  DOCS_FEEDBACK_CLICKED = 'docs_feedback_clicked',

  HOMEPAGE_HERO_START_PROJECT_CLICKED = 'homepage_hero_start_project_clicked',
  HOMEPAGE_HERO_REQUEST_DEMO_CLICKED = 'homepage_hero_request_demo_clicked',
  HOMEPAGE_FRAMEWORK_QUICKSTART_CLICKED = 'homepage_framework_quickstart_clicked',
  HOMEPAGE_PRODUCT_CARD_CLICKED = 'homepage_product_card_clicked',
  PRICING_PLAN_CTA_CLICKED = 'pricing_plan_cta_clicked',
  PRICING_COMPARISON_PLAN_CLICKED = 'pricing_comparison_plan_clicked',
  EVENT_PAGE_CTA_CLICKED = 'event_page_cta_clicked',
  HOMEPAGE_GITHUB_BUTTON_CLICKED = 'homepage_github_button_clicked',
  HOMEPAGE_GITHUB_DISCUSSIONS_BUTTON_CLICKED = 'homepage_github_discussions_button_clicked',
  HOMEPAGE_DISCORD_BUTTON_CLICKED = 'homepage_discord_button_clicked',
  HOMEPAGE_CUSTOMER_STORY_CARD_CLICKED = 'homepage_customer_story_card_clicked',
  HOMEPAGE_PROJECT_TEMPLATE_CARD_CLICKED = 'homepage_project_template_card_clicked',
}

/**
 * Triggered when a user signs up. When signing up with Email and Password, this is only triggered once user confirms their email.
 *
 * @group Events
 * @source studio
 * @page /sign-up
 */
export interface SignUpEvent {
  action: TelemetryActions.SIGN_UP
  properties: {
    category: 'conversion'
  }
}

/**
 * Triggered when a user signs in with Github, Email and Password or SSO.
 *
 * Some unintuitive behavior:
 *   - If signing up with GitHub the SignInEvent gets triggered first before the SignUpEvent.
 *
 * @group Events
 * @source studio
 * @page /sign-in-mfa
 */
export interface SignInEvent {
  action: TelemetryActions.SIGN_IN
  properties: {
    category: 'account'
  }
}

/**
 * User copied the database connection string.
 *
 * @group Events
 * @source studio
 */
export interface ConnectionStringCopiedEvent {
  action: TelemetryActions.CONNECTION_STRING_COPIED
  properties: {
    /**
     * Method selected by user, e.g. URI, PSQL, SQLAlchemy, etc.
     */
    connectionType: string
    /**
     * Language of the code block if selected, e.g. bash, go
     */
    lang: string
    /**
     * Connection Method, e.g. direct, transaction_pooler, session_pooler
     */
    connectionMethod: 'direct' | 'transaction_pooler' | 'session_pooler'
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * Cron job created.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/integrations/cron/jobs?dialog-shown=true
 */
export interface CronJobCreatedEvent {
  action: TelemetryActions.CRON_JOB_CREATED
  properties: {
    /**
     * What the cron job executes, e.g. sql_function or sql_snippet
     */
    type: 'sql_function' | 'sql_snippet' | 'edge_function' | 'http_request'
    /**
     * Schedule of the cron job in the format of * * * * *
     */
    schedule: string
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * Cron job updated.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/integrations/cron/jobs?dialog-shown=true
 */
export interface CronJobUpdatedEvent {
  action: TelemetryActions.CRON_JOB_UPDATED
  properties: {
    /**
     * What the cron job executes, e.g. sql_function or sql_snippet
     */
    type: 'sql_function' | 'sql_snippet' | 'edge_function' | 'http_request'
    /**
     * Schedule of the cron job in the format of * * * * *
     */
    schedule: string
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * Cron job deleted.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/integrations/cron/jobs
 */
export interface CronJobDeletedEvent {
  action: TelemetryActions.CRON_JOB_DELETED
  groups: {
    project: string
    organization: string
  }
}

/**
 * Create job button clicked that opens the dialog.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/integrations/cron/jobs
 */
export interface CronJobCreateClickedEvent {
  action: TelemetryActions.CRON_JOB_CREATE_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * Edit cron job button (hidden in the dropdown) clicked that opens the dialog.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/integrations/cron/jobs
 */
export interface CronJobUpdateClickedEvent {
  action: TelemetryActions.CRON_JOB_UPDATE_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * Delete cron job button (hidden in the dropdown) clicked that opens the deletion confirmation modal.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/integrations/cron/jobs
 */
export interface CronJobDeleteClickedEvent {
  action: TelemetryActions.CRON_JOB_DELETE_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * History button clicked to see previous runs of the cron job
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/integrations/cron/jobs
 */
export interface CronJobHistoryClickedEvent {
  action: TelemetryActions.CRON_JOB_HISTORY_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * The FeaturePreviewModal was opened.
 *
 * The FeaturePreviewModal can be opened clicking at the profile icon at the bottom left corner of the project sidebar.
 *
 * @group Events
 * @source studio
 */
export interface FeaturePreviewsClickedEvent {
  action: TelemetryActions.FEATURE_PREVIEWS_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * A feature preview was enabled by the user through the FeaturePreviewModal.
 *
 * The FeaturePreviewModal can be opened clicking at the profile icon at the bottom left corner of the project sidebar.
 *
 * @group Events
 * @source studio
 */
export interface FeaturePreviewEnabledEvent {
  action: TelemetryActions.FEATURE_PREVIEW_ENABLED
  properties: {
    /**
     * Feature key of the preview that was enabled. e.g. supabase-ui-api-side-panel
     */
    feature: string
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * A feature preview was disabled by the user through the FeaturePreviewModal.
 *
 * The FeaturePreviewModal can be opened clicking at the profile icon at the bottom left corner of the project sidebar.
 *
 * @group Events
 * @source studio
 */
export interface FeaturePreviewDisabledEvent {
  action: TelemetryActions.FEATURE_PREVIEW_DISABLED
  properties: {
    /**
     * Feature key of the preview that was disabled. e.g. supabase-ui-api-side-panel
     */
    feature: string
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * On the InitialStep.tsx screen, where user can chose to prompt, start blank or migrate, at least 5 characters were typed
 * in the prompt textarea indicating an intention to use the prompt.
 *
 * @group Events
 * @source studio
 * @page new/v2/{slug}
 */
export interface ProjectCreationInitialStepPromptIntendedEvent {
  action: TelemetryActions.PROJECT_CREATION_INITIAL_STEP_PROMPT_INTENDED
  /**
   * Is this a new prompt (e.g. when following the start blank route where no prompt has been filled in the InitialStep). In other
   * words, was this not just an edit. In this case, it should always be true.
   */
  properties: {
    isNewPrompt: boolean
  }
}

/**
 * First step of project creation was submitted, where the user writes a prompt or select to start blank or to migrate.
 *
 * @group Events
 * @source studio
 * @page new/v2/{slug}
 */
export interface ProjectCreationInitialStepSubmittedEvent {
  action: TelemetryActions.PROJECT_CREATION_INITIAL_STEP_SUBMITTED
  properties: {
    /**
     * Records what the user selected in the first step of project creation.
     */
    onboardingPath: 'use_prompt' | 'start_blank' | 'migrate'
  }
}

/**
 * After the InitialStep screen, at least 5 characters were typed in the prompt textarea indicating an intention to use the prompt.
 *
 * @group Events
 * @source studio
 * @page new/v2/{slug}
 */
export interface ProjectCreationSecondStepPromptIntendedEvent {
  action: TelemetryActions.PROJECT_CREATION_SECOND_STEP_PROMPT_INTENDED
  properties: {
    /**
     * Is this a new prompt (e.g. when following the start blank route where no prompt has been filled in the InitialStep). In other
     * words, was this not just an edit.
     */
    isNewPrompt: boolean
  }
}

/**
 * Second and final step of project creation was submitted. More precisely, right after the user clicks on "Create Project". To check,
 * if the project creation was successful, please refer to project_created event.
 *
 * @group Events
 * @source studio
 * @page new/v2/{slug}
 */
export interface ProjectCreationSecondStepSubmittedEvent {
  action: TelemetryActions.PROJECT_CREATION_SECOND_STEP_SUBMITTED
}

/**
 * After selecting channel, either "Listening to channel" or "Start listening" button was clicked.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/realtime/inspector
 */
export interface RealtimeInspectorListenChannelClickedEvent {
  action: TelemetryActions.REALTIME_INSPECTOR_LISTEN_CHANNEL_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * A broadcast message was sent from the SendMessageModal.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/realtime/inspector
 */
export interface RealtimeInspectorBroadcastSentEvent {
  action: TelemetryActions.REALTIME_INSPECTOR_BROADCAST_SENT
  groups: {
    project: string
    organization: string
  }
}

/**
 * A message was clicked in the RealtimeInspector, which opens a sidebar that shows the messsage details including metadata.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/realtime/inspector
 */
export interface RealtimeInspectorMessageClickedEvent {
  action: TelemetryActions.REALTIME_INSPECTOR_MESSAGE_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * A message was copied from the RealtimeInspector.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/realtime/inspector
 */
export interface RealtimeInspectorCopyMessageClickedEvent {
  action: TelemetryActions.REALTIME_INSPECTOR_COPY_MESSAGE_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * Filters were applied in the RealtimeInspector.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/realtime/inspector
 */
export interface RealtimeInspectorFiltersAppliedEvent {
  action: TelemetryActions.REALTIME_INSPECTOR_FILTERS_APPLIED
  groups: {
    project: string
    organization: string
  }
}

/**
 * Database role was updated in the RealtimeInspector.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/realtime/inspector
 */
export interface RealtimeInspectorDatabaseRoleUpdatedEvent {
  action: TelemetryActions.REALTIME_INSPECTOR_DATABASE_ROLE_UPDATED
  groups: {
    project: string
    organization: string
  }
}

/**
 * Quickstart card clicked in the SQL editor.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/sql
 */
export interface SqlEditorQuickstartClickedEvent {
  action: TelemetryActions.SQL_EDITOR_QUICKSTART_CLICKED
  properties: {
    /**
     * The title of the quickstart card clicked.
     */
    quickstartName: string
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * Template card clicked in the SQL editor.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/sql
 */
export interface SqlEditorTemplateClickedEvent {
  action: TelemetryActions.SQL_EDITOR_TEMPLATE_CLICKED
  properties: {
    /**
     * The name of the template card clicked.
     */
    templateName: string
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * Result download CSV button clicked in the SQL editor.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/sql
 */
export interface SqlEditorResultDownloadCsvClickedEvent {
  action: TelemetryActions.SQL_EDITOR_RESULT_DOWNLOAD_CSV_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * Result copy markdown button clicked in the SQL editor.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/sql
 */
export interface SqlEditorResultCopyMarkdownClickedEvent {
  action: TelemetryActions.SQL_EDITOR_RESULT_COPY_MARKDOWN_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * Result copy JSON button clicked in the SQL editor.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/sql
 */
export interface SqlEditorResultCopyJsonClickedEvent {
  action: TelemetryActions.SQL_EDITOR_RESULT_COPY_JSON_CLICKED
  groups: {
    project: string
    organization: string
  }
}

/**
 * User submitted a prompt to the assistant sidebar.
 *
 * @group Events
 * @source studio
 */
export interface AssistantPromptSubmittedEvent {
  action: TelemetryActions.ASSISTANT_PROMPT_SUBMITTED
  groups: {
    project: string
    organization: string
  }
}

/**
 * User submitted a debug request to the assistant sidebar or prompt submitted has Help me to debug.
 *
 * @group Events
 * @source studio
 */
export interface AssistantDebugSubmittedEvent {
  action: TelemetryActions.ASSISTANT_DEBUG_SUBMITTED
  groups: {
    project: string
    organization: string
  }
}

/**
 * User clicked the run query button in the suggestion provided in the assistant sidebar.
 *
 * @group Events
 * @source studio
 */
export interface AssistantSuggestionRunQueryClickedEvent {
  action: TelemetryActions.ASSISTANT_SUGGESTION_RUN_QUERY_CLICKED
  properties: {
    /**
     * The type of suggestion that was run by the user. Mutate or Select query types only.
     */
    queryType: string
    category?: string
  }
}

/**
 * User accepted or rejected changes in sql ai diff handler. They can accept change by clicking accept button or typing shortcut (CMD+Enter) or reject by clicking reject button or typing shortcut (Esc). Handler only appears after clicking any dropdown option in Edit in Sql Editor in suggestion provided by the assistant. The dropdown options only appear in any page with 'sql' in url.
 *
 * @group Events
 * @source studio
 * @page /dashboard/project/{ref}/sql
 */
export interface AssistantSqlDiffHandlerEvaluatedEvent {
  action: TelemetryActions.ASSISTANT_SQL_DIFF_HANDLER_EVALUATED
  properties: {
    /**
     * Whether the user accepted or rejected the changes.
     */
    handlerAccepted: boolean
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * User clicked Edit in SQL Editor button in the assistant sidebar when user is in any page that does not have 'sql' in url or is in a new snippet.
 *
 * @group Events
 * @source studio
 */
export interface AssistantEditInSqlEditorClickedEvent {
  action: TelemetryActions.ASSISTANT_EDIT_IN_SQL_EDITOR_CLICKED
  properties: {
    /**
     * Whether the user is in the SQL editor page or in a new snippet.
     */
    isInSQLEditor: boolean
    isInNewSnippet: boolean
  }
  groups: {
    project: string
    organization: string
  }
}

/**
 * User voted on the feedback button on a docs page. The feedback button is located at the sidebar of every docs page.
 *
 * @group Events
 * @source docs
 */
export interface DocsFeedbackClickedEvent {
  action: TelemetryActions.DOCS_FEEDBACK_CLICKED
  properties: {
    /**
     * 'yes' means clicking on the tick button, 'no' means clicking on the cross button.
     */
    response: 'yes' | 'no'
  }
}

/**
 * User clicked the "Start Project" button in the homepage hero section.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageHeroStartProjectClickedEvent {
  action: TelemetryActions.HOMEPAGE_HERO_START_PROJECT_CLICKED
}

/**
 * User clicked the "Request a Demo" button in the homepage hero section.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageHeroRequestDemoClickedEvent {
  action: TelemetryActions.HOMEPAGE_HERO_REQUEST_DEMO_CLICKED
}

/**
 * Framework quickstart card clicked in homepage and will lead to specific framework doc.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageFrameworkQuickstartClickedEvent {
  action: TelemetryActions.HOMEPAGE_FRAMEWORK_QUICKSTART_CLICKED
  properties: {
    /**
     * The name of the framework quickstart card clicked.
     */
    frameworkName: string
  }
}

/**
 * User clicked on a product card in the homepage products section.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageProductCardClickedEvent {
  action: TelemetryActions.HOMEPAGE_PRODUCT_CARD_CLICKED
  properties: {
    product: string
  }
}

/**
 * User clicked on the green button on a plan in the pricing page.
 *
 * @group Events
 * @source www
 * @page /pricing
 */
export interface PricingPlanCtaClickedEvent {
  action: TelemetryActions.PRICING_PLAN_CTA_CLICKED
  properties: {
    /**
     * The plan type that was clicked.
     */
    plan: string
    /**
     * Whether the upgrade now text is shown on the cta button. This is only shown when org is upgradeable and user is logged in.
     */
    showUpgradeText: boolean
    /**
     * The section of the page where the plan was clicked. Main means the big top section of the page, comparison_table means the comparison table with all plans listen together below.
     */
    section: 'main' | 'comparison_table'
    tableMode?: 'mobile' | 'desktop'
  }
}

/**
 * User clicked on a plan in the pricing comparison section.
 *
 * @group Events
 * @source www
 * @page /pricing
 */
export interface PricingComparisonPlanClickedEvent {
  action: TelemetryActions.PRICING_COMPARISON_PLAN_CLICKED
  properties: {
    category: 'pricing_comparison'
    /**
     * The plan type that was clicked.
     */
    plan: 'free' | 'pro' | 'team' | 'enterprise'
  }
}

/**
 * User clicked on the main CTA button in an event page.
 *
 * @group Events
 * @source www
 * @page /events/*
 */
export interface EventPageCtaClickedEvent {
  action: TelemetryActions.EVENT_PAGE_CTA_CLICKED
  properties: {
    eventTitle: string
  }
}

/**
 * User clicked on the GitHub button in the homepage header section. Is hidden when in mobile view.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageGitHubButtonClickedEvent {
  action: TelemetryActions.HOMEPAGE_GITHUB_BUTTON_CLICKED
}

/**
 * User clicked on the GitHub Discussions button in the homepage community section.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageGitHubDiscussionsButtonClickedEvent {
  action: TelemetryActions.HOMEPAGE_GITHUB_DISCUSSIONS_BUTTON_CLICKED
}

/**
 * User clicked on the Discord button in the homepage community section.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageDiscordButtonClickedEvent {
  action: TelemetryActions.HOMEPAGE_DISCORD_BUTTON_CLICKED
}

/**
 * User clicked on a customer story in the homepage.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageCustomerStoryCardClickedEvent {
  action: TelemetryActions.HOMEPAGE_CUSTOMER_STORY_CARD_CLICKED
  properties: {
    customer?: string
    /**
     * The size of the card clicked.
     */
    cardType: 'expanded' | 'narrow'
  }
}

/**
 * User clicked on a project template card in the homepage.
 *
 * @group Events
 * @source www
 * @page /
 */
export interface HomepageProjectTemplateCardClickedEvent {
  action: TelemetryActions.HOMEPAGE_PROJECT_TEMPLATE_CARD_CLICKED
  properties: {
    /**
     * The title of the project template card clicked.
     */
    templateTitle: string
  }
}

export type TelemetryEvent =
  | SignUpEvent
  | SignInEvent
  | ConnectionStringCopiedEvent
  | CronJobCreatedEvent
  | CronJobUpdatedEvent
  | CronJobDeletedEvent
  | CronJobCreateClickedEvent
  | CronJobUpdateClickedEvent
  | CronJobDeleteClickedEvent
  | CronJobHistoryClickedEvent
  | FeaturePreviewsClickedEvent
  | FeaturePreviewEnabledEvent
  | FeaturePreviewDisabledEvent
  | ProjectCreationInitialStepPromptIntendedEvent
  | ProjectCreationInitialStepSubmittedEvent
  | ProjectCreationSecondStepPromptIntendedEvent
  | ProjectCreationSecondStepSubmittedEvent
  | RealtimeInspectorListenChannelClickedEvent
  | RealtimeInspectorBroadcastSentEvent
  | RealtimeInspectorMessageClickedEvent
  | RealtimeInspectorCopyMessageClickedEvent
  | RealtimeInspectorFiltersAppliedEvent
  | RealtimeInspectorDatabaseRoleUpdatedEvent
  | SqlEditorQuickstartClickedEvent
  | SqlEditorTemplateClickedEvent
  | SqlEditorResultDownloadCsvClickedEvent
  | SqlEditorResultCopyMarkdownClickedEvent
  | SqlEditorResultCopyJsonClickedEvent
  | AssistantPromptSubmittedEvent
  | AssistantDebugSubmittedEvent
  | AssistantSuggestionRunQueryClickedEvent
  | AssistantSqlDiffHandlerEvaluatedEvent
  | AssistantEditInSqlEditorClickedEvent
  | DocsFeedbackClickedEvent
  | HomepageHeroStartProjectClickedEvent
  | HomepageHeroRequestDemoClickedEvent
  | HomepageFrameworkQuickstartClickedEvent
  | HomepageProductCardClickedEvent
  | PricingPlanCtaClickedEvent
  | PricingComparisonPlanClickedEvent
  | EventPageCtaClickedEvent
  | HomepageGitHubButtonClickedEvent
  | HomepageGitHubDiscussionsButtonClickedEvent
  | HomepageDiscordButtonClickedEvent
  | HomepageCustomerStoryCardClickedEvent
  | HomepageProjectTemplateCardClickedEvent
