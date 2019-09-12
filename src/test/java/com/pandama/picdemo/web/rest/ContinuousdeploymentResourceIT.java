package com.pandama.picdemo.web.rest;

import com.pandama.picdemo.PicdemoApp;
import com.pandama.picdemo.domain.Continuousdeployment;
import com.pandama.picdemo.repository.ContinuousdeploymentRepository;
import com.pandama.picdemo.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.pandama.picdemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ContinuousdeploymentResource} REST controller.
 */
@SpringBootTest(classes = PicdemoApp.class)
public class ContinuousdeploymentResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private ContinuousdeploymentRepository continuousdeploymentRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restContinuousdeploymentMockMvc;

    private Continuousdeployment continuousdeployment;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ContinuousdeploymentResource continuousdeploymentResource = new ContinuousdeploymentResource(continuousdeploymentRepository);
        this.restContinuousdeploymentMockMvc = MockMvcBuilders.standaloneSetup(continuousdeploymentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Continuousdeployment createEntity(EntityManager em) {
        Continuousdeployment continuousdeployment = new Continuousdeployment()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT);
        return continuousdeployment;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Continuousdeployment createUpdatedEntity(EntityManager em) {
        Continuousdeployment continuousdeployment = new Continuousdeployment()
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);
        return continuousdeployment;
    }

    @BeforeEach
    public void initTest() {
        continuousdeployment = createEntity(em);
    }

    @Test
    @Transactional
    public void createContinuousdeployment() throws Exception {
        int databaseSizeBeforeCreate = continuousdeploymentRepository.findAll().size();

        // Create the Continuousdeployment
        restContinuousdeploymentMockMvc.perform(post("/api/continuousdeployments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continuousdeployment)))
            .andExpect(status().isCreated());

        // Validate the Continuousdeployment in the database
        List<Continuousdeployment> continuousdeploymentList = continuousdeploymentRepository.findAll();
        assertThat(continuousdeploymentList).hasSize(databaseSizeBeforeCreate + 1);
        Continuousdeployment testContinuousdeployment = continuousdeploymentList.get(continuousdeploymentList.size() - 1);
        assertThat(testContinuousdeployment.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testContinuousdeployment.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createContinuousdeploymentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = continuousdeploymentRepository.findAll().size();

        // Create the Continuousdeployment with an existing ID
        continuousdeployment.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContinuousdeploymentMockMvc.perform(post("/api/continuousdeployments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continuousdeployment)))
            .andExpect(status().isBadRequest());

        // Validate the Continuousdeployment in the database
        List<Continuousdeployment> continuousdeploymentList = continuousdeploymentRepository.findAll();
        assertThat(continuousdeploymentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllContinuousdeployments() throws Exception {
        // Initialize the database
        continuousdeploymentRepository.saveAndFlush(continuousdeployment);

        // Get all the continuousdeploymentList
        restContinuousdeploymentMockMvc.perform(get("/api/continuousdeployments?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(continuousdeployment.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }
    
    @Test
    @Transactional
    public void getContinuousdeployment() throws Exception {
        // Initialize the database
        continuousdeploymentRepository.saveAndFlush(continuousdeployment);

        // Get the continuousdeployment
        restContinuousdeploymentMockMvc.perform(get("/api/continuousdeployments/{id}", continuousdeployment.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(continuousdeployment.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingContinuousdeployment() throws Exception {
        // Get the continuousdeployment
        restContinuousdeploymentMockMvc.perform(get("/api/continuousdeployments/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContinuousdeployment() throws Exception {
        // Initialize the database
        continuousdeploymentRepository.saveAndFlush(continuousdeployment);

        int databaseSizeBeforeUpdate = continuousdeploymentRepository.findAll().size();

        // Update the continuousdeployment
        Continuousdeployment updatedContinuousdeployment = continuousdeploymentRepository.findById(continuousdeployment.getId()).get();
        // Disconnect from session so that the updates on updatedContinuousdeployment are not directly saved in db
        em.detach(updatedContinuousdeployment);
        updatedContinuousdeployment
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT);

        restContinuousdeploymentMockMvc.perform(put("/api/continuousdeployments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedContinuousdeployment)))
            .andExpect(status().isOk());

        // Validate the Continuousdeployment in the database
        List<Continuousdeployment> continuousdeploymentList = continuousdeploymentRepository.findAll();
        assertThat(continuousdeploymentList).hasSize(databaseSizeBeforeUpdate);
        Continuousdeployment testContinuousdeployment = continuousdeploymentList.get(continuousdeploymentList.size() - 1);
        assertThat(testContinuousdeployment.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testContinuousdeployment.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingContinuousdeployment() throws Exception {
        int databaseSizeBeforeUpdate = continuousdeploymentRepository.findAll().size();

        // Create the Continuousdeployment

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restContinuousdeploymentMockMvc.perform(put("/api/continuousdeployments")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(continuousdeployment)))
            .andExpect(status().isBadRequest());

        // Validate the Continuousdeployment in the database
        List<Continuousdeployment> continuousdeploymentList = continuousdeploymentRepository.findAll();
        assertThat(continuousdeploymentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteContinuousdeployment() throws Exception {
        // Initialize the database
        continuousdeploymentRepository.saveAndFlush(continuousdeployment);

        int databaseSizeBeforeDelete = continuousdeploymentRepository.findAll().size();

        // Delete the continuousdeployment
        restContinuousdeploymentMockMvc.perform(delete("/api/continuousdeployments/{id}", continuousdeployment.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Continuousdeployment> continuousdeploymentList = continuousdeploymentRepository.findAll();
        assertThat(continuousdeploymentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Continuousdeployment.class);
        Continuousdeployment continuousdeployment1 = new Continuousdeployment();
        continuousdeployment1.setId(1L);
        Continuousdeployment continuousdeployment2 = new Continuousdeployment();
        continuousdeployment2.setId(continuousdeployment1.getId());
        assertThat(continuousdeployment1).isEqualTo(continuousdeployment2);
        continuousdeployment2.setId(2L);
        assertThat(continuousdeployment1).isNotEqualTo(continuousdeployment2);
        continuousdeployment1.setId(null);
        assertThat(continuousdeployment1).isNotEqualTo(continuousdeployment2);
    }
}
