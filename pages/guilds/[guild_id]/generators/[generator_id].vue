<template>
  <div class="flex flex-col gap-8 mb-64">
    <DashboardSettingsSaveToast
      :open="generator_settings_edited"
      :loading="update_generator_pending"
      @save="update_generator({ guild_id: guild_id!, generator_id: generator_id!, generator_settings: m_generator_settings! })"
      @reset="m_generator_settings = useClone(generator_settings)"
    />

    <div class="flex items-center gap-4">
      <IconGenerator class="size-10 stroke-foreground-link-standout" />
      <div class="flex flex-col">
        <span v-if="guild_channels" class="dashboard-section-title">
          {{ guild_channels.find(c => c.id == generator_id)?.name ?? "Deleted channel" }}
        </span>
        <Skeleton v-else class="h-10 w-72" />
        <span class="dashboard-section-description">Manage the settings of this temporary voice channel generator!</span>
      </div>
      <div class="flex-grow" />
      <AlertDialog>
        <AlertDialogTrigger>
          <ButtonDestructive
            :loading="delete_generator_loading"
          >
            Delete
          </ButtonDestructive>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete the generator?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be un-done and you wont be able to restore this generator!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go back</AlertDialogCancel>
            <AlertDialogAction
              :destructive="true"
              :loading="delete_generator_loading"
              @click="delete_generator({ guild_id: guild_id!, generator_id: generator_id! })"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>

    <div class="flex flex-col gap-12" v-if="m_generator_settings && guild_channels && guild_roles">
      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL NAME</span>
        <div class="groups-container">
          <GroupSetting
            heading="Name"
            description="The default name that temporary voice channels have when created"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="m_generator_settings.default_name"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                  required
                >
                <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => m_generator_settings!.default_name += v" :is_ultimate="is_ultimate" />
              </div>
            </template>
          </GroupSetting>
          <GroupSetting
            heading="Locked name"
            description="The name that temporary voice channels have when locked"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="m_generator_settings.default_locked_name"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                >
                <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => m_generator_settings!.default_locked_name += v" :is_ultimate="is_ultimate"/>
              </div>
            </template>
          </GroupSetting>
          <GroupSetting
            heading="Hidden name"
            description="The name that temporary voice channels have when hidden"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="m_generator_settings.default_hidden_name"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                >
                <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => m_generator_settings!.default_hidden_name += v" :is_ultimate="is_ultimate" />
              </div>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL RENAME CONDITIONS</span>
        <div class="groups-container">
          <GroupSetting
            heading="State change"
            description="Whether the voice channel name should be update when the state of the voice channel changes. For example when the user locks or hides the channel"
          >
            <Switch v-model:checked="m_generator_settings.rename_conditions.state_change" />
          </GroupSetting>
          <GroupSetting
            heading="Owner change"
            description="Whether the voice channel name should be update when the owner changes"
          >
            <Switch v-model:checked="m_generator_settings.rename_conditions.owner_change" />
          </GroupSetting>
          <GroupSetting
            heading="Activity change"
            description="Whether the voice channel name should be update when the activity of the owner changes. For example when the owner stops playing a game"
          >
            <Switch v-model:checked="m_generator_settings.rename_conditions.activity_change" />
          </GroupSetting>
          <GroupSetting
            heading="Renaming"
            description="Whether the voice channel name should be updated even if it was manually renamed by the owner. For example, if this setting is off and the owner renames the channel, it wont be updated when any of the above scenarios happen"
          >
            <Switch v-model:checked="m_generator_settings.rename_conditions.renamed" />
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL SETTINGS</span>
        <div class="groups-container-compact flex-wrap">
          <GroupSetting
            heading="Category"
            description="The category in which temporary voice channels are generated"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="category_id"
                @update:model-value="(category_id) => m_generator_settings!.category = category_id !== 'no_category' ? category_id : null"
                >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{category}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="category in guild_channels.filter(c => c.type == 4)"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </SelectItem>
                    <!-- 'No category' option -->
                    <SelectItem value="no_category">No category</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Position"
            description="The exact position where temporary voice channels are placed inside the category."
            compact
          >
            <template #bottom-action>
              <Select
                required
                v-model:model-value="m_generator_settings.initial_position"
                @update:modelValue="(pos) => m_generator_settings!.initial_position = GSGeneratorInitialPosition[pos as keyof typeof GSGeneratorInitialPosition]"
              >
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="pos in Object.values(GSGeneratorInitialPosition)"
                      :value="pos"
                    >
                      {{capitalize(pos)}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="User limit"
            description="The user limit, or 0 for no user limit"
            compact
          >
            <template #bottom-action>
              <input
                v-model="m_generator_settings.user_limit"
                type="number"
                min="0"
                max="99"
                required
              >
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Bitrate"
            description="The bitrate in kbps, or 0 for using your Discord server default bitrate"
            compact
          >
            <template #bottom-action>
              <div class="relative vertical-center">
                <input
                  v-bind:value="m_generator_settings.bitrate / 1000"
                  @input="m_generator_settings.bitrate = $event.target.value * 1000"
                  type="number"
                  min="0"
                  max="384"
                  class="grow"
                  required
                >
                <span :class="cn('absolute text-foreground-secondary transition-all duration-100', m_generator_settings.bitrate >= 100000 ? 'left-10' : m_generator_settings.bitrate >= 10000 ? 'left-8' : 'left-6')">kbps</span>
              </div>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Region"
            compact
          >
            <template #description>
              <span class="text-foreground-secondary">
                To change region that is applied to temporary voice channels, change the region of the generator, using the channel settings inside Discord.
                <ButtonText
                  class="text-foreground-link-standout"
                  @click="navigateTo(
                    'https://support.discord.com/hc/en-us/articles/1500007645701-Voice-Regions-on-Discord-FAQ#h_01F3RXJ4YCHYS652ETKWJ499Y3',
                    { open: { target: '_blank' } }
                  )"
                >
                  See guide
                </ButtonText>
              </span>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">VOICE CHANNEL PERMISSIONS</span>
        <div class="groups-container-compact flex-wrap">
          <GroupSetting
            heading="Inheriting"
            description="Choose if temporary voice channels inherit permissions from the generator, the category in which they are generated, or if they should not inherit any permissions"
            compact
          >
            <template #bottom-action>
              <Select
                required
                v-model:model-value="m_generator_settings.permissions_inherited"
                @update:modelValue="(v) => m_generator_settings!.permissions_inherited = GSGeneratorPermissionsInherited[v as keyof typeof GSGeneratorPermissionsInherited]"
              >
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="v in Object.values(GSGeneratorPermissionsInherited)"
                      :value="v"
                    >
                      {{capitalize(v)}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Default state"
            description="Whether the temporary voice channel should be locked or hidden upon creation"
            compact
          >
            <template #bottom-action>
              <Select
                required
                v-model:model-value="m_generator_settings.initial_state"
                @update:modelValue="(v) => m_generator_settings!.initial_state = GSGeneratorVCState[v as keyof typeof GSGeneratorVCState]"
              >
                <SelectTrigger>
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="v in Object.values(GSGeneratorVCState).filter(v => v !== GSGeneratorVCState.UNHIDDEN)"
                      :value="v"
                    >
                      {{capitalize(v)}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Target role"
            description="Astro will modify the permissions of this role when needed, for example when a user locks or hides the channel"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="target_role_id"
                @update:model-value="(role_id) => m_generator_settings!.permissions_target_role = role_id !== 'no_role' ? role_id : null"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{target_role}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="role in guild_roles.filter(r => r.id !== guild_id).sort((a, b) => b.position - a.position)"
                      :key="role.id"
                      :value="role.id"
                    >
                      <div class="vertical-center gap-2">
                        <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${role.color.toString(16)}`"></span>
                        {{ role.name }}
                      </div>
                    </SelectItem>
                    <!-- @everyone role option -->
                    <SelectItem value="no_role">@everyone</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Moderator role"
            description="This role will always have permissions to manage the channel, even when the channel is locked or hidden"
            compact
          >
            <template #bottom-action>
              <Select
                v-model:model-value="moderator_role_id"
                @update:model-value="(role_id) => m_generator_settings!.permissions_immune_role = role_id !== 'no_role' ? role_id : null"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{moderator_role}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="role in guild_roles.filter(r => r.id !== guild_id).sort((a, b) => b.position - a.position)"
                      :key="role.id"
                      :value="role.id"
                    >
                      <div class="vertical-center gap-2">
                        <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${role.color.toString(16)}`"></span>
                        {{ role.name }}
                      </div>
                    </SelectItem>
                    <!-- @everyone role option -->
                    <SelectItem value="no_role">No role</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">COMMANDS SETTINGS</span>
        <div class="groups-container-compact">
          <GroupSetting
            heading="Badwords filter"
            description="If enabled, prevents users from using badwords in their channel name (English only)"
            :ultimate="!is_ultimate"
            compact
            @upgrade="upgrade_dialog_open=true"
          >
            <template #bottom-action>
              <Switch v-model:checked="badwords_filter" />
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Minimum user limit"
            description="The minimum user limit users are allowed to set for their temporary voice channel, 0 means no limit"
            compact
          >
            <template #bottom-action>
              <input
                v-model="m_generator_settings.commands_settings.min_user_limit"
                type="number"
                min="0"
                :max="m_generator_settings.commands_settings.max_user_limit"
                required
              >
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Maximum user limit"
            description="The maximum user limit users are allowed to set for their temporary voice channel, 0 means no limit"
            compact
          >
            <template #bottom-action>
              <input
                v-model="m_generator_settings.commands_settings.max_user_limit"
                type="number"
                :min="m_generator_settings.commands_settings.min_user_limit"
                :max="99"
                required
              >
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Minimum bitrate"
            description="The minimum bitrate, in kbps, users are allowed to set for their temporary voice channel"
            compact
          >
            <template #bottom-action>
              <div class="relative vertical-center">
                <input
                  v-bind:value="m_generator_settings.commands_settings.min_bitrate / 1000"
                  @input="m_generator_settings.commands_settings.min_bitrate = $event.target.value * 1000"
                  type="number"
                  min="8"
                  :max="m_generator_settings.commands_settings.max_bitrate"
                  class="grow"
                  required
                >
                <span :class="cn('absolute text-foreground-secondary transition-all duration-100', m_generator_settings.commands_settings.min_bitrate >= 100000 ? 'left-10' : m_generator_settings.commands_settings.min_bitrate >= 10000 ? 'left-8' : 'left-6')">kbps</span>
              </div>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Maximum bitrate"
            description="The maximum bitrate, in kbps, users are allowed to set for their temporary voice channel"
            compact
          >
            <template #bottom-action>
              <div class="relative vertical-center">
                <input
                  v-bind:value="m_generator_settings.commands_settings.max_bitrate / 1000"
                  @input="m_generator_settings.commands_settings.max_bitrate = $event.target.value * 1000"
                  type="number"
                  min="0"
                  max="384"
                  class="grow"
                  required
                >
                <span :class="cn('absolute text-foreground-secondary transition-all duration-100', m_generator_settings.commands_settings.max_bitrate >= 100000 ? 'left-10' : m_generator_settings.commands_settings.max_bitrate >= 10000 ? 'left-8' : 'left-6')">kbps</span>
              </div>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">UTILITIES</span>
        <div class="groups-container-compact">
          <GroupSetting
            heading="Owner role"
            description="This role will be given to temporary voice channel owners"
            class="relative"
            :ultimate="!is_ultimate"
            compact
            @upgrade="upgrade_dialog_open=true"
          >
            <template #bottom-action>
              <Select
                :disabled="!is_ultimate"
                v-model:model-value="owner_role_id"
                @update:model-value="(role_id) => m_generator_settings!.owner_role = role_id !== 'no_role' ? role_id : null"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{owner_role}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="role in guild_roles.filter(r => r.id !== guild_id).sort((a, b) => b.position - a.position)"
                      :key="role.id"
                      :value="role.id"
                    >
                      <div class="vertical-center gap-2">
                        <span :class="`size-3 rounded-full min-w-3 min-h-3`" :style="`background-color: #${role.color.toString(16)}`"></span>
                        {{ role.name }}
                      </div>
                    </SelectItem>
                    <!-- no role option -->
                    <SelectItem value="no_role">No role</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Queue mode"
            description="When enabled, Astro will first move users into existing temporary voice channels if available. If there are no temporary voice channels available, it will create a new one"
            compact
          >
            <template #bottom-action>
              <Switch v-model:checked="m_generator_settings.queue_mode" />
            </template>
          </GroupSetting>

          <GroupSetting
            heading="Fallback generator"
            description="If this generator reaches the limit of temporary voice channels (Discord allows a maximum of 50 voice channels per category), Astro will move the user to this generator as fallback"
            :ultimate="!is_ultimate"
            compact
            @upgrade="upgrade_dialog_open=true"
          >
            <template #bottom-action>
              <Select
                :disabled="!is_ultimate"
                v-model:model-value="fallback_generator_id"
                @update:model-value="(id) => m_generator_settings!.fallback_id = id !== 'no_fallback' ? id : null"
              >
                <SelectTrigger>
                  <SelectValue aria-label="value">{{fallback_generator}}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="generator in guild_channels.filter(c => guild_settings?.generators.some(g => g.id == c.id))"
                      :key="generator.id"
                      :value="generator.id"
                    >
                      {{ generator.name }}
                    </SelectItem>
                    <!-- 'No category' option -->
                    <SelectItem value="no_fallback">No fallback</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </template>
          </GroupSetting>
        </div>
      </div>

      <div class="groups-wrapper">
        <span class="text-group-name">WAITING ROOM</span>
        <div class="groups-container">
          <GroupSetting
            heading="Automatic waiting room creation"
            description="When enabled, Astro will automatically create a waiting room for temporary voice channels upon creation"
            :ultimate="!is_ultimate"
            @upgrade="upgrade_dialog_open=true"
          >
            <Switch :disabled="!is_ultimate" v-model:checked="m_generator_settings.auto_waiting" />
          </GroupSetting>

          <GroupSetting
            heading="Name"
            description="The default name for waiting rooms"
          >
            <template #bottom-action>
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="m_generator_settings.default_waiting_name"
                  class="grow"
                  minlength="2"
                  maxlength="500"
                  required
                >
                <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => m_generator_settings!.default_waiting_name += v" :is_ultimate="is_ultimate" />
              </div>
            </template>
          </GroupSetting>

          <div class="groups-container-compact">
            <GroupSetting
              heading="Category"
              description="The category in which waiting rooms are generated"
              compact
            >
              <template #bottom-action>
                <Select
                  v-model:model-value="waiting_category_id"
                  @update:model-value="(category_id) => m_generator_settings!.waiting_category = category_id !== 'no_category' ? category_id : null"
                >
                  <SelectTrigger>
                    <SelectValue aria-label="value">{{waiting_category}}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="category in guild_channels.filter(c => c.type == 4)"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category.name }}
                      </SelectItem>
                      <!-- 'No category' option -->
                      <SelectItem value="no_category">No category</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>

            <GroupSetting
              heading="Position"
              description="Whether waiting rooms should be generated above or below their corresponding temporary voice channel. Or at the bottom of the category"
              compact
            >
              <template #bottom-action>
                <Select
                  required
                  v-model:model-value="m_generator_settings.waiting_position"
                  @update:modelValue="(pos) => m_generator_settings!.waiting_position = GSGeneratorInitialPosition[pos as keyof typeof GSGeneratorInitialPosition]"
                >
                  <SelectTrigger>
                    <SelectValue></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="pos in Object.values(GSGeneratorInitialPosition)"
                        :value="pos"
                      >
                        {{capitalize(pos)}}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>

            <GroupSetting
              heading="User limit"
              description="The user limit for waiting rooms"
              compact
            >
              <template #bottom-action>
                <input
                  v-model="m_generator_settings.waiting_user_limit"
                  type="number"
                  min="0"
                  max="99"
                  required
                >
              </template>
            </GroupSetting>

            <GroupSetting
              heading="Bitrate"
              description="The bitrate in kbps for waiting rooms, or 0 for using your Discord server default bitrate"
              compact
            >
              <template #bottom-action>
                <div class="relative vertical-center">
                  <input
                    v-bind:value="m_generator_settings.waiting_bitrate / 1000"
                    @input="m_generator_settings.waiting_bitrate = $event.target.value * 1000"
                    type="number"
                    min="0"
                    max="384"
                    class="grow"
                    required
                  >
                  <span :class="cn('absolute text-foreground-secondary transition-all duration-100', m_generator_settings.waiting_bitrate >= 100000 ? 'left-10' : m_generator_settings.waiting_bitrate >= 10000 ? 'left-8' : 'left-6')">kbps</span>
                </div>
              </template>
            </GroupSetting>

            <GroupSetting
              heading="Permissions inheriting"
              description="Choose if waiting rooms inherit permissions from the generator, the category in which they are generated, or if they should not inherit any permissions"
              compact
            >
              <template #bottom-action>
                <Select
                  required
                  v-model:model-value="m_generator_settings.waiting_permissions_inherited"
                  @update:modelValue="(v) => m_generator_settings!.waiting_permissions_inherited = GSGeneratorPermissionsInherited[v as keyof typeof GSGeneratorPermissionsInherited]"
                >
                  <SelectTrigger>
                    <SelectValue></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="v in Object.values(GSGeneratorPermissionsInherited)"
                        :value="v"
                      >
                        {{capitalize(v)}}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>
          </div>
          </div>
        </div>

        <div class="groups-wrapper">
          <span class="text-group-name">PRIVATE TEXT CHAT</span>
          <div class="groups-container">
            <GroupSetting
              heading="Automatic private chat creation"
              description="When enabled, Astro will automatically create a private text channel for each temporary voice channel upon creation"
              :ultimate="!is_ultimate"
              @upgrade="upgrade_dialog_open=true"
            >
              <Switch :disabled="!is_ultimate" v-model:checked="m_generator_settings.auto_chat" />
            </GroupSetting>

            <GroupSetting
              heading="Name"
              description="The default name for private text chats"
            >
              <template #bottom-action>
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="m_generator_settings.default_chat_name"
                    class="grow"
                    minlength="2"
                    maxlength="500"
                    required
                  >
                  <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => m_generator_settings!.default_chat_name += v" :is_ultimate="is_ultimate" />
                </div>
              </template>
            </GroupSetting>

            <GroupSetting
              heading="Topic"
              description="The topic automatically set on every private text chat"
            >
              <template #bottom-action>
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="m_generator_settings.chat_topic"
                    class="grow"
                    minlength="0"
                    maxlength="1024"
                    required
                  >
                  <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => m_generator_settings!.default_chat_name += v" :is_ultimate="is_ultimate" />
                </div>
              </template>
            </GroupSetting>

            <GroupSetting
              heading="Creation message type"
              description="Choose the type of message that Astro should send in each private text chat upon creation"
            >
              <Select
                required
                v-model:model-value="private_chat_message_type"
                @update:modelValue="(v) => private_chat_message_type = PrivateChatMessageType[v as keyof typeof PrivateChatMessageType]"
              >
                <SelectTrigger class="w32 md:w-64">
                  <SelectValue></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="v in Object.values(PrivateChatMessageType)"
                      :value="v"
                    >
                      {{capitalize(v)}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </GroupSetting>

            <GroupSetting
              v-if="private_chat_message_type == PrivateChatMessageType.TEXT_MESSAGE || private_chat_message_type == PrivateChatMessageType.EMBED"
              heading="Creation message"
              description="A message that Astro sends in every private text chat upon creation"
            >
              <template #bottom-action>
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="m_generator_settings.default_chat_text"
                    class="grow"
                    minlength="0"
                    :maxlength="private_chat_message_type == PrivateChatMessageType.TEXT_MESSAGE ? 2048 : 4096"
                    required
                  >
                  <DashboardVariablesButton @upgrade="upgrade_dialog_open = true" @variableSelect="(v) => m_generator_settings!.default_chat_name += v" :is_ultimate="is_ultimate" />
                </div>
              </template>
            </GroupSetting>

            <GroupSetting
              v-if="private_chat_message_type == PrivateChatMessageType.INTERFACE"
              heading="Interface for creation message"
              description="The interface that Astro should send in private text chats upon creation"
            >
              <template #bottom-action>
                <Select
                  required
                  v-model:model-value="m_generator_settings.chat_interface"
                  @update:modelValue="(i) => m_generator_settings!.chat_interface = i"
                >
                  <SelectTrigger>
                    <SelectValue aria-label="value">Interface in #{{chat_interface}}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem
                        v-for="(v, index) in guild_settings!.interfaces"
                        :key="v.message_id"
                        :value="index"
                        class=""
                      >
                        <div class="flex flex-col">
                          <span>Interface in #{{guild_channels.find(c => c.id == v.channel_id)?.name}}</span>
                          <span class="text-foreground-secondary">Message id: {{v.message_id}}</span>
                        </div>
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </template>
            </GroupSetting>


            <div class="groups-container-compact">
              <GroupSetting
                heading="Category"
                description="The category in which private text chats are generated"
                compact
              >
                <template #bottom-action>
                  <Select
                    v-model:model-value="private_chat_category_id"
                    @update:model-value="(id) => m_generator_settings!.chat_category = id !== 'no_category' ? id : null"
                  >
                    <SelectTrigger>
                      <SelectValue aria-label="value">{{private_chat_category}}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="category in guild_channels.filter(c => c.type == 4)"
                          :key="category.id"
                          :value="category.id"
                        >
                          {{ category.name }}
                        </SelectItem>
                        <!-- 'No category' option -->
                        <SelectItem value="no_category">No category</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </template>
              </GroupSetting>

              <GroupSetting
                heading="Permission Inheriting"
                description="Choose if private text chats inherit permissions from the generator, the category in which they are generated, or if they should not inherit any permissions"
                compact
              >
                <template #bottom-action>
                  <Select
                    required
                    v-model:model-value="m_generator_settings.chat_permissions_inherited"
                    @update:modelValue="(v) => m_generator_settings!.chat_permissions_inherited = GSGeneratorPermissionsInherited[v as keyof typeof GSGeneratorPermissionsInherited]"
                  >
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="v in Object.values(GSGeneratorPermissionsInherited)"
                          :value="v"
                        >
                          {{capitalize(v)}}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </template>
              </GroupSetting>

              <GroupSetting
                heading="Nsfw"
                description="Control the nsfw setting for private text chats"
                compact
              >
                <template #bottom-action>
                  <Switch v-model:checked="m_generator_settings.chat_nsfw" />
                </template>
              </GroupSetting>

              <GroupSetting
                heading="Slowmode"
                description="Set the slowmode of private text chats, in seconds. Use 0 for no slowmode"
                compact
              >
                <template #bottom-action>
                  <input
                    v-model="m_generator_settings.chat_slowmode"
                    type="number"
                    min="0"
                    max="21600"
                    required
                  >
                </template>
              </GroupSetting>
  <!-- message (embed, normal, interface) -->
            </div>
          </div>
        </div>


    </div>

    <div v-else-if="guild_settings_error" class="center text-foreground-destructive">
      Something went wrong, please try again later
    </div>
    <div v-else class="center">
      <IconLoading />
    </div>

    <DashboardUpgradeDialog
      v-model:open="upgrade_dialog_open"
      @onUpgrade="(sub_id) => { upgrade_dialog_open = false; upgrade_guild({ guild_id: guild_id!, subscription_id: sub_id }) }"
      @onPurchaseOnWebsite="() => navigateTo('/ultimate', { external: true, open: { target: '_blank' } })"
      @onPurchaseOnDiscord="() => navigateTo('/discord-ultimate', { external: true, open: { target: '_blank' } })"
    />
  </div>
</template>

<script setup lang="ts">
import {IconNames} from "assets/config/IconNames";
import useUpdateGeneratorMutation from "~/data/astro/mutations/useUpdateGeneratorMutation";
import type {GSGenerator} from "~/types/guild-settings/generator";
import {deepEqual} from "fast-equals";
import {Select, SelectItem} from "~/components/ui/select";
import {useToast} from "~/components/ui/toast";

definePageMeta({
  middleware: 'auth',
  layout: 'dashboard',
})

useHead({
  title: "Generator - "
})

useSeoMeta({
  title: 'Generator settings - Astro - Temporary Voice Channels for your Discord!',
  ogTitle: 'Generator settings - Astro - Temporary Voice Channels for your Discord!',
  description: 'Configure all the settings of your temporary voice channel generator',
  ogDescription: 'Configure all the settings of your temporary voice channel generator',
})

const { toast } = useToast()
const route = useRoute()
const guild_id = useGuildId()
const generator_id = ref(route.params.generator_id as string | undefined)

watch(() => route.params, (params) => {
  generator_id.value = params.generator_id as string | undefined
})

const { data: guild_channels } = useGuildChannels(guild_id)
const { data: guild_roles } = useGuildRoles(guild_id)
const { data: guild_settings, error: guild_settings_error } = useGuildSettings(guild_id)

const upgrade_dialog_open = ref(false)
const is_ultimate = computed(() => {
  if (guild_settings.value) {
    return isGuildUltimate(guild_settings.value)
  } else {
    return false
  }
})

const generator_settings = ref<GSGenerator | undefined>(undefined)
watch(guild_settings, (new_guild_settings) => {
  generator_settings.value = new_guild_settings?.generators?.find(c => c.id == generator_id.value)
}, { deep: true, immediate: true })

const m_generator_settings = ref<GSGenerator | undefined>(undefined)
const generator_settings_edited = ref(false)


watch(generator_settings, (new_generator_settings) => {
  if (new_generator_settings) {
    m_generator_settings.value = useClone(new_generator_settings)
  }
}, { deep: true, immediate: true })

watch(m_generator_settings, (new_m_generator_settings) => {
  if (!generator_settings.value || !new_m_generator_settings) {
    generator_settings_edited.value = false
  } else {
    generator_settings_edited.value = !deepEqual(new_m_generator_settings, generator_settings.value)
  }
}, { deep: true, immediate: true })


/// COMPUTED SETTINGS ///
const badwords_filter = computed({
  get() {
    return !(m_generator_settings.value?.commands_settings.badwords_allowed ?? true)
  },
  set(required) {
    if (m_generator_settings.value) {
      m_generator_settings.value.commands_settings.badwords_allowed = !required
    }
  }
})

const category_id = computed({
  get() {
    return m_generator_settings.value?.category ?? 'no_category'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.category = value !== 'no_category' ? value : null
    }
  },
});
const category = computed(() => {
  return guild_channels.value?.find(c => c.id === category_id.value)?.name ?? 'No category'
});

const target_role_id = computed({
  get() {
    return m_generator_settings.value?.permissions_target_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.permissions_target_role = value !== 'no_role' ? value : null
    }
  }
})
const target_role = computed(() => {
  return guild_roles.value?.find(r => r.id === target_role_id.value)?.name ?? '@everyone'
})

const moderator_role_id = computed({
  get() {
    return m_generator_settings.value?.permissions_immune_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.permissions_immune_role = value !== 'no_role' ? value : null
    }
  }
})
const moderator_role = computed(() => {
  return guild_roles.value?.find(r => r.id === moderator_role_id.value)?.name ?? 'Not set'
})

const owner_role_id = computed({
  get() {
    return m_generator_settings.value?.owner_role ?? 'no_role'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.owner_role = value !== 'no_role' ? value : null
    }
  }
})
const owner_role = computed(() => {
  return guild_roles.value?.find(r => r.id === owner_role_id.value)?.name ?? 'Not set'
})

const fallback_generator_id = computed({
  get() {
    return m_generator_settings.value?.fallback_id ?? 'no_fallback'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.fallback_id = value !== 'no_fallback' ? value : null
    }
  },
});
const fallback_generator = computed(() => {
  return guild_channels.value?.find(c => c.id === fallback_generator_id.value)?.name ?? 'No fallback'
});

const waiting_category_id = computed({
  get() {
    return m_generator_settings.value?.waiting_category ?? 'no_category'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.waiting_category = value !== 'no_category' ? value : null
    }
  },
});
const waiting_category = computed(() => {
  return guild_channels.value?.find(c => c.id === waiting_category_id.value)?.name ?? 'No category'
});

const private_chat_category_id = computed({
  get() {
    return m_generator_settings.value?.chat_category ?? 'no_category'
  },
  set(value) {
    if (m_generator_settings.value) {
      m_generator_settings.value.chat_category = value !== 'no_category' ? value : null
    }
  },
});
const private_chat_category = computed(() => {
  return guild_channels.value?.find(c => c.id === private_chat_category_id.value)?.name ?? 'No category'
});

const chat_interface = computed(() => {
  if (m_generator_settings.value && guild_settings.value && guild_channels.value) {
    const astro_interface = m_generator_settings.value.chat_interface != -1 ? guild_settings.value.interfaces[m_generator_settings.value.chat_interface] : null
    if (astro_interface == null) {
      return "No interface"
    } else {
      return guild_channels.value?.find(c => c.id == astro_interface.channel_id)?.name ?? "No interface"
    }
  } else {
    return "No interface"
  }
})


const enum PrivateChatMessageType {
  NO_MESSAGE = "No message",
  TEXT_MESSAGE = "Text message",
  EMBED = "Embed message",
  INTERFACE = "Astro interface"
}

const private_chat_message_type = computed({
  get() {
    if (m_generator_settings.value) {
      if (m_generator_settings.value.chat_interface != -1) {
        return PrivateChatMessageType.INTERFACE
      } else if (m_generator_settings.value.default_chat_text !== null) {
        if (m_generator_settings.value.default_chat_text_embed)
          return PrivateChatMessageType.EMBED
        else
          return PrivateChatMessageType.TEXT_MESSAGE
      } else {
        return PrivateChatMessageType.NO_MESSAGE
      }
    } else {
      return PrivateChatMessageType.NO_MESSAGE
    }
  },
  set(value) {
    switch (value) {
      case PrivateChatMessageType.NO_MESSAGE: {
        if (m_generator_settings.value) {
          m_generator_settings.value.chat_interface = -1
          m_generator_settings.value.default_chat_text = null
        }
        break;
      }
      case PrivateChatMessageType.TEXT_MESSAGE: {
        if (m_generator_settings.value) {
          m_generator_settings.value.chat_interface = -1
          if (m_generator_settings.value.default_chat_text == null) {
            m_generator_settings.value.default_chat_text = "This is your private text chat!"
          }
          m_generator_settings.value.default_chat_text_embed = false
        }
        break;
      }
      case PrivateChatMessageType.EMBED: {
        if (m_generator_settings.value) {
          m_generator_settings.value.chat_interface = -1
          if (m_generator_settings.value.default_chat_text == null) {
            m_generator_settings.value.default_chat_text = "This is your private text chat"
          }
          m_generator_settings.value.default_chat_text_embed = true
        }
        break;
      }
      case PrivateChatMessageType.INTERFACE: {
        if (m_generator_settings.value && guild_settings.value) {
          if (guild_settings.value.interfaces.length > 0) {
            if (m_generator_settings.value.chat_interface == -1)
              m_generator_settings.value.chat_interface = 0

            m_generator_settings.value.default_chat_text = null
          } else {
            toast({
              description: 'You need to first create an Interface to be able to use it as the private text chat message',
              variant: 'destructive'
            })
          }
        }
        break;
      }
      default:
        break;
    }
  }
})


/// MUTATIONS ///
const { mutate: delete_generator, isPending: delete_generator_loading, error: delete_generator_error, isSuccess: delete_generator_success } = useDeleteGeneratorMutation()
const { mutate: update_generator, isPending: update_generator_pending, error: update_generator_error } = useUpdateGeneratorMutation()
const { mutate: upgrade_guild } = useGuildUpgradeMutation()

/// SUCCESS ACTIONS ///
watch(guild_settings_error, (e) => {
  if (e instanceof AstroApiError && e.code == AstroApiErrorCode.ASTRO_NOT_IN_GUILD && guild_id.value) {
    useInvite().invite_to_guild(guild_id.value)
  }
})

watch(delete_generator_success, (s) => {
  if (s) {
    navigateTo(`/guilds/${guild_id.value}/generators`)
  }
})

/// ERROR TOASTS ///
watch(delete_generator_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})

watch(update_generator_error, (e) => {
  if (e?.message) {
    toast({
      description: e.message,
      variant: 'destructive'
    })
  }
})
</script>